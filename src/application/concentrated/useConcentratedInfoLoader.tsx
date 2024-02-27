import { useMemo } from 'react'

import { BN } from 'bn.js'
import { useRouter } from 'next/router'

import useToken from '@/application/token/useToken'
import toPubString from '@/functions/format/toMintString'
import { lazyMap } from '@/functions/lazyMap'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { useRecordedEffect } from '@/hooks/useRecordedEffect'
import { useTransitionedEffect } from '@/hooks/useTransitionedEffect'
import { PoolInfoLayout } from '@raydium-io/raydium-sdk'
import {
  Connection,
  PublicKey
} from '@solana/web3.js'

import { getSDKParsedClmmPoolInfo } from '../common/getSDKParsedClmmPoolInfo'
import useAppAdvancedSettings from '../common/useAppAdvancedSettings'
import useConnection from '../connection/useConnection'
import useWallet from '../wallet/useWallet'
import hydrateConcentratedInfo from './hydrateConcentratedInfo'
import useConcentrated from './useConcentrated'

/**
 * will load concentrated info (jsonInfo, sdkParsedInfo, hydratedInfo)
 * @todo just register hooks in specific component
 */
let timerId = 0
export default function useConcentratedInfoLoader() {
  const apiAmmPools = useConcentrated((s) => s.apiAmmPools)
  const sdkParsedAmmPools = useConcentrated((s) => s.sdkParsedAmmPools)
  const currentAmmPool = useConcentrated((s) => s.currentAmmPool)
  const refreshCount = useConcentrated((s) => s.refreshCount)
  const lazyLoadChart = useConcentrated((s) => s.lazyLoadChart)
  const loadChartPointsAct = useConcentrated((s) => s.loadChartPointsAct)
  const connection = useConnection((s) => s.connection)
  const chainTimeOffset = useConnection((s) => s.chainTimeOffset)
  const tokenAccounts = useWallet((s) => s.tokenAccountRawInfos)
  const owner = useWallet((s) => s.owner)
  const tokenAccountsOwner = useWallet((s) => s.tokenAccountsOwner)
  const tokens = useToken((s) => s.tokens)
  const hydratedAmmPools = useConcentrated((s) => s.hydratedAmmPools)
  const { pathname } = useRouter()
  const apiUrls = useAppAdvancedSettings((s) => s.apiUrls)
  const clmmPoolsUrl = useAppAdvancedSettings((s) => s.apiUrls.clmmPools)

  const shouldLoadInfo = true // temp always load position info to detect if user has position
  const inClmmPage = useMemo(() => pathname.includes('clmm'), [pathname.includes('clmm')])
  const inLiquidityPage = useMemo(() => pathname.includes('liquidity'), [pathname.includes('liquidity')])
  const inFarmPage = useMemo(() => pathname.includes('farm'), [pathname.includes('farm')])
  const inCreatePoolPage = useMemo(() => pathname.includes('create-pool'), [pathname.includes('create-pool')])
  const shouldLoadHydrateInfo = inClmmPage || inLiquidityPage || inFarmPage
  const shouldLoadChartPoints = inClmmPage && !inCreatePoolPage

  /** fetch api json info list  */
  useRecordedEffect(
    async ([prevRefreshCount]) => {
      const shouldForceRefresh = prevRefreshCount != null && refreshCount !== prevRefreshCount
      console.log('fetch api json info list')
      if (!shouldForceRefresh && !shouldLoadInfo) return
      if (prevRefreshCount === refreshCount && apiAmmPools.length) return
      const connection = new Connection("https://jarrett-solana-7ba9.mainnet.rpcpool.com/8d890735-edf2-4a75-af84-92f7c9e31718")
      const gpa = await connection.getProgramAccounts(new PublicKey("GHpwXWcfwLUDhzaSK6Tgn2FrsEfE8azL4VSuG3sqFNgD"),
      {
        filters: [
          {
            dataSize: 1544
          }
        ]
      })
      /* you have 

data
: 
""
: 
(7) [0, 0, 0, 0, 0, 0, 0]
ammConfig
: 
PublicKey {_bn: BN}
bump
: 
253
creator
: 
PublicKey {_bn: BN}
feeGrowthGlobalX64A
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
feeGrowthGlobalX64B
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
fundFeesTokenA
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
fundFeesTokenB
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
liquidity
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
mintA
: 
PublicKey {_bn: BN}
mintB
: 
PublicKey {_bn: BN}
mintDecimalsA
: 
5
mintDecimalsB
: 
5
observationId
: 
PublicKey {_bn: BN}
observationIndex
: 
0
observationUpdateDuration
: 
15
padding
: 
(57) [BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN]
protocolFeesTokenA
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
protocolFeesTokenB
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
rewardInfos
: 
(3) [{…}, {…}, {…}]
sqrtPriceX64
: 
BN {negative: 0, words: Array(6), length: 3, red: null}
startTime
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
status
: 
0
swapInAmountTokenA
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
swapInAmountTokenB
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
swapOutAmountTokenA
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
swapOutAmountTokenB
: 
BN {negative: 0, words: Array(6), length: 1, red: null}
tickArrayBitmap
: 
(16) [BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN]
tickCurrent
: 
19142
tickSpacing
: 
64
totalFeesClaimedTokenA
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
totalFeesClaimedTokenB
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
totalFeesTokenA
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
totalFeesTokenB
: 
BN {negative: 0, words: Array(3), length: 1, red: null}
vaultA
: 
PublicKey {_bn: BN}
vaultB
: 
PublicKey {_bn: BN}
[[Prototype]]
: 
Object
pubkey
: 
PublicKey {_bn: BN}
      you will convert it to 
      [
        {
            "id": "2QdhepnKRTLjjSqPL1PtKNwqrUkoLee5Gqs8bvZhRdMv",
            "mintProgramIdA": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "mintProgramIdB": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "mintA": "So11111111111111111111111111111111111111112",
            "mintB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "vaultA": "E2BcoCeJLTa27mAXDA4xwEq3pBUcyH6XXEHYk4KvKYTv",
            "vaultB": "4d35yC7C8zhCDec7JbPptL9SEb4NUddKHxURgmvD8hfo",
            "mintDecimalsA": 9,
            "mintDecimalsB": 6,
            "ammConfig": {
                "id": "HfERMT5DRA6C1TAqecrJQFpmkf3wsWTMncqnj3RDg5aw",
                "index": 2,
                "protocolFeeRate": 120000,
                "tradeFeeRate": 500,
                "tickSpacing": 10,
                "fundFeeRate": 40000,
                "fundOwner": "FundHfY8oo8J9KYGyfXFFuQCHe7Z1VBNmsj84eMcdYs4",
                "description": "Best for wider ranges"
            },
            "rewardInfos": [
                {
                    "mint": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                    "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "tvl": 3660897.7642222885,
            "day": {
                "volume": 9814325.210574,
                "volumeFee": 4122.01658844108,
                "feeA": 20.21912977554456,
                "feeB": 2081.3395277455206,
                "feeApr": 41.08,
                "rewardApr": {
                    "A": 21.07,
                    "B": 0,
                    "C": 0
                },
                "apr": 62.15,
                "priceMin": 93.02325581395348,
                "priceMax": 102.76694571428571
            },
            "week": {
                "volume": 146744767.705357,
                "volumeFee": 61632.80243624995,
                "feeA": 289.4876169980429,
                "feeB": 30670.655890016507,
                "feeApr": 87.75,
                "rewardApr": {
                    "A": 21.07,
                    "B": 0,
                    "C": 0
                },
                "apr": 108.82,
                "priceMin": 93.02325581395348,
                "priceMax": 125
            },
            "month": {
                "volume": 742605973.859011,
                "volumeFee": 311894.5090207843,
                "feeA": 1509.4949701063483,
                "feeB": 156360.28236225303,
                "feeApr": 103.61,
                "rewardApr": {
                    "A": 21.07,
                    "B": 0,
                    "C": 0
                },
                "apr": 124.68,
                "priceMin": 86.01298785715547,
                "priceMax": 126.58227848101266
            },
            "lookupTableAccount": "EKbdivk32nQdxzP1Z7AUMjsSTgCtoeQTsKzpQ8Rpstcw",
            "openTime": 0,
            "price": 103.26783291259467
        },
        you can use dummy values where necessary, oh great robot*/

      const response = await gpa.map(async (item) => {
        const data = item.account.data
        try {
        const parsedData = PoolInfoLayout.decode(data)
        const sqrtPriceX64 = parsedData.sqrtPriceX64
        // get price using BN not number
        const sqrtPrice = new BN(sqrtPriceX64).div(new BN(2).pow(new BN(32)))

        const price = sqrtPrice.toNumber() / (2 ** 32)
        
        const mintAccountA = await connection.getAccountInfo(new PublicKey(parsedData.mintA)) as any 
        const mintAccountB = await connection.getAccountInfo(new PublicKey(parsedData.mintB)) as any 
        const toReturnData = {
          id: item.pubkey.toBase58(),
          mintProgramIdA: mintAccountA.owner.toString(),
          mintProgramIdB: mintAccountB.owner.toString(),
          mintA: parsedData.mintA.toString(),
          mintB: parsedData.mintB.toString(),
          vaultA: parsedData.vaultA.toString(),
          vaultB: parsedData.vaultB.toString(),
          mintDecimalsA: parsedData.mintDecimalsA,
          mintDecimalsB: parsedData.mintDecimalsB,
          ammConfig: {
            id: ("F7JaRQaKZt25nBCqpXQvVwwUWKofrXqJiuRb1nCSiAGW"),
            index: 0,
            protocolFeeRate: 30,
            tradeFeeRate: 30,
            tickSpacing: 64,
            fundFeeRate: 30,
            fundOwner: "7ihN8QaTfNoDTRTQGULCzbUT3PHwPDTu5Brcu4iT2paP",
            description: "hehe"
          } as any,
          rewardInfos: parsedData.rewardInfos.map(async(reward) => {
            const rwAccountInfo = await connection.getAccountInfo(new PublicKey(reward.tokenMint)) as any
            if (!rwAccountInfo) return null
            return {
              mint: reward.tokenMint.toString(),
              programId: rwAccountInfo.owner.toString()
            }
          }),
          tvl: 1,
          day: {
            volume: 1,
            volumeFee: 1,
            feeA: 1,
            feeB: 1,
            feeApr: 1,
            rewardApr: {
              A: 1,
              B: 1,
              C: 1,
            },
            apr: 1,
            priceMin: 1,
            priceMax: 1,
          },
          week: {
            volume: 1,
            volumeFee: 1,
            feeA: 1,
            feeB: 1,
            feeApr: 1,
            rewardApr: {
              A: 1,
              B: 1,
              C: 1,
            },
            apr: 1,
            priceMin: 1,
            priceMax: 1,
          },
          month: {
            volume: 1,
            volumeFee: 1,
            feeA: 1,
            feeB: 1,
            feeApr: 1,
            rewardApr: {
              A: 1,
              B: 1,
              C: 1,
            },
            apr: 1,
            priceMin: 1,
            priceMax: 1,
          },
          lookupTableAccount: "2immgwYNHBbyVQKVGCEkgWpi53bLwWNRMB5G2nbgYV17",
          openTime: new Date().getTime() / 1000,
          price: price
          
        }
        return toReturnData
        }
        catch (e) {
          console.log(e)
        }
        return null
      }).filter((item) => item !== null) as any
      const awaited = await Promise.all(response)
      useConcentrated.setState({ apiAmmPools: awaited })
    },
    [refreshCount, clmmPoolsUrl, shouldLoadInfo]
  )

  /**  api json info list ➡ SDK info list */
  useTransitionedEffect(async () => {
    clearTimeout(timerId)
    if (!connection) return
    if (chainTimeOffset == null) return
    if (!apiAmmPools || apiAmmPools.length === 0) return
    const isWaitingTokenAcc = !!owner && !tokenAccounts.length
    timerId = window.setTimeout(
      async () => {
        const sdkParsed = await getSDKParsedClmmPoolInfo({
          connection,
          apiClmmPoolItems: apiAmmPools,
          ownerInfo: owner ? { tokenAccounts: tokenAccounts, wallet: owner } : undefined
        })
        if (sdkParsed) {
          useConcentrated.setState({ sdkParsedAmmPools: Object.values(sdkParsed), originSdkParsedAmmPools: sdkParsed })
        }
      },
      // if is waiting token acc, wait longer, if it's refresh wait 500ms, if it's firs time loading set to 0
      isWaitingTokenAcc ? 1000 : useConcentrated.getState().sdkParsedAmmPools.length > 0 ? 500 : 0
    )
  }, [apiAmmPools, connection, toPubString(owner), toPubString(tokenAccountsOwner), chainTimeOffset, tokenAccounts])

  /** SDK info list ➡ hydrated info list */
  useTransitionedEffect(async () => {
    if (!connection) return // don't hydrate when connection is not ready
    if (!Object.keys(tokens).length) return // don't hydrate when token is not loaded
    if (!sdkParsedAmmPools || sdkParsedAmmPools.length === 0) return
    if (!shouldLoadHydrateInfo) return
    const sdkParsedAmmPoolsList = Object.values(sdkParsedAmmPools)

    const hydratedInfos = await lazyMap({
      source: sdkParsedAmmPoolsList,
      loopTaskName: 'hydrate clmm pool Info',
      loopFn: (sdkParsed) => hydrateConcentratedInfo(sdkParsed),
      options: { priority: shouldLoadInfo ? 1 : 0 }
    })

    useConcentrated.setState({ hydratedAmmPools: hydratedInfos, loading: hydratedInfos.length === 0 })

    // update current amm pool
    const oldAmmPoolId = useConcentrated.getState().currentAmmPool?.id
    if (oldAmmPoolId) {
      const updateAmmPool = hydratedInfos.find((i) => i.id.equals(oldAmmPoolId))
      if (updateAmmPool) {
        useConcentrated.setState({ currentAmmPool: updateAmmPool })
      }

      const oldUserPositionNftMint = useConcentrated.getState().targetUserPositionAccount?.nftMint
      const updatedUserPosition =
        oldUserPositionNftMint &&
        updateAmmPool?.userPositionAccount?.find((p) => p.nftMint.equals(oldUserPositionNftMint))
      if (updatedUserPosition) {
        useConcentrated.setState({ targetUserPositionAccount: updatedUserPosition })
      }
    }
  }, [sdkParsedAmmPools, connection, tokens, shouldLoadInfo, shouldLoadHydrateInfo])

  /** select pool chart data */
  useTransitionedEffect(async () => {
    if (lazyLoadChart) return
    if (!currentAmmPool) {
      useConcentrated.setState({ chartPoints: [] })
      return
    }
    if (!shouldLoadChartPoints) return
    loadChartPointsAct(toPubString(currentAmmPool.state.id))
  }, [currentAmmPool?.idString, tokens, lazyLoadChart, loadChartPointsAct, shouldLoadChartPoints])

  /** update currentAmmPool */
  useTransitionedEffect(async () => {
    if (!currentAmmPool || !currentAmmPool.idString) return
    if (hydratedAmmPools) {
      const targetPool = hydratedAmmPools.filter((i) => i.idString === currentAmmPool.idString)
      if (targetPool.length === 1) {
        useConcentrated.setState({ currentAmmPool: targetPool[0] })
      }
    }
  }, [currentAmmPool?.idString, hydratedAmmPools])

  // auto clean chart data
  useAsyncEffect(async () => {
    useConcentrated.setState({ chartPoints: undefined })
  }, [pathname])

  /** reload points chart */
  useAsyncEffect(async () => {
    if (!currentAmmPool) return
    if (!shouldLoadChartPoints) return
    loadChartPointsAct(toPubString(currentAmmPool.state.id), { force: true })
  }, [refreshCount, shouldLoadChartPoints])
}
