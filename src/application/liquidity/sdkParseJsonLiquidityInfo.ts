import { BN } from 'bn.js'

import useConnection from '@/application/connection/useConnection'
import { shakeUndifindedItem } from '@/functions/arrayMethods'
import listToMap from '@/functions/format/listToMap'
import toPubString from '@/functions/format/toMintString'
import {
  ApiPoolInfoItem,
  ApiPoolInfoItem as LiquidityJsonInfo,
  jsonInfo2PoolKeys,
  PoolInfoLayout,
  ReturnTypeFetchMultipleInfo
} from '@raydium-io/raydium-sdk'
import {
  Connection,
  PublicKey,
  Transaction
} from '@solana/web3.js'

import { SDKParsedLiquidityInfo } from './type'

const cache = new Map<LiquidityJsonInfo['id'], SDKParsedLiquidityInfo>()

 async function simulateTransaction(connection: Connection, transactions: Transaction[], batchRequest?: boolean) {
  let results: any[] = []
  
    try {
      results = await Promise.all(
        transactions.map(async (transaction) => await (await connection.simulateTransaction(transaction)).value),
      )
    } catch (error) {
      console.log('simulateTransaction error:', error)
    }

  return results
}
export function cleanCachedLiquidityInfo() {
  cache.clear()
}
async function  fetchMultipleInfo({
  connection,
  pools,
  batchRequest = true,
}: {
  connection: Connection
  pools: ApiPoolInfoItem[]
  batchRequest?: boolean
}): Promise<ReturnTypeFetchMultipleInfo> {
const poolsInfo: ReturnTypeFetchMultipleInfo = {}

 for (const pool of pools) {
const poolInfo = await connection.getAccountInfo(new PublicKey(pool.id))
const decoded = PoolInfoLayout.decode(poolInfo?.data as Buffer)
const ammId = pool.id.toString()
const status = new BN(decoded.status)
const mintA = new PublicKey(decoded.mintA)
const mintB = new PublicKey(decoded.mintB)
const mintAInfo = await connection.getAccountInfo(mintA)
const mintBInfo = await connection.getAccountInfo(mintB)
const baseDecimals = mintAInfo?.data[44] as number 
const quoteDecimals = mintBInfo?.data[44] as number 
const lpDecimals = mintAInfo?.data[44] as number
const baseReserveKey = new PublicKey(decoded.vaultA)
const quoteReserveKey = new PublicKey(decoded.vaultB)
const baseReserveAccountInfo = await connection.getParsedAccountInfo(baseReserveKey)
const quoteReserveAccountInfo = await connection.getParsedAccountInfo(quoteReserveKey)
// @ts-ignore
const baseReserveTokenAmount = baseReserveAccountInfo.value?.data.parsed.info.tokenAmount.amount
// @ts-ignore
const quoteReserveTokenAmount = quoteReserveAccountInfo.value?.data.parsed.info.tokenAmount.amount

    poolsInfo[ammId] = {
      ammId,
      status,
      baseDecimals,
      quoteDecimals,
      lpDecimals,
      baseReserve:new BN( baseReserveTokenAmount),
      quoteReserve: new BN( quoteReserveTokenAmount ),
      lpSupply: new BN(quoteReserveTokenAmount),
      startTime: new BN(decoded.startTime),
    }
  }

  return poolsInfo
}

export default async function sdkParseJsonLiquidityInfo(
  liquidityJsonInfos: ApiPoolInfoItem[],
  connection = useConnection.getState().connection
): Promise<SDKParsedLiquidityInfo[]> {
  if (!connection) return []
  if (!liquidityJsonInfos.length) return [] // no jsonInfo
  const allCachedSDKLiquidityInfos = shakeUndifindedItem(liquidityJsonInfos.map((i) => cache.get(i.id)))
  const allCachedSDKLiquidityInfosMap = listToMap(allCachedSDKLiquidityInfos, (i) => toPubString(i.id))
  const allCachedIDs = allCachedSDKLiquidityInfos.map((i) => toPubString(i.id))
  const allNeedSDKParsedLiquidityInfos = liquidityJsonInfos;
  console.log(allNeedSDKParsedLiquidityInfos)

  const info = await (allNeedSDKParsedLiquidityInfos.length
    ? fetchMultipleInfo({
        connection,
        pools: allNeedSDKParsedLiquidityInfos
      })
        .catch(() => [])
        .then((res) => Object.values(res))
    : [])
    console.log('info', info)

  const sdkParsed: SDKParsedLiquidityInfo[] = info.map((sdkParsed, idx) => ({
    jsonInfo: allNeedSDKParsedLiquidityInfos[idx],
    ...jsonInfo2PoolKeys(allNeedSDKParsedLiquidityInfos[idx]),
    ...sdkParsed
  }))
  console.log('sdkParsed', sdkParsed)
  const sdkParsedMap = listToMap(sdkParsed, (i) => toPubString(i.id))
  if (sdkParsed.length) {
    sdkParsed.forEach((i) => {
      cache.set(toPubString(i.id), i)
    })
  }
  console.log('sdkParsedMap', sdkParsedMap)
  const merged = { ...allCachedSDKLiquidityInfosMap, ...sdkParsedMap }
  return liquidityJsonInfos.map((jsonInfo) => merged[jsonInfo.id])
}
