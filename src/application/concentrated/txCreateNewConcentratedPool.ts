import assert from '@/functions/assert'
import txHandler from '../txTools/handleTx'
import { GenerateCreateClmmPositionTxFnParams, generateCreateClmmPositionTx } from './txCreateConcentratedPosition'
import useConcentrated from './useConcentrated'
import useNotification from '../notification/useNotification'
import { isToken2022 } from '../token/isToken2022'
import { openToken2022ClmmAmountConfirmPanel } from '../token/openToken2022ClmmPositionConfirmPanel'
import { toTokenAmount } from '@/functions/format/toTokenAmount'
import { PublicKey } from '@solana/web3.js'

export default async function txCreateNewConcentratedPool(
  payload: GenerateCreateClmmPositionTxFnParams = useConcentrated.getState()
) {
console.log(payload)
  let userHasConfirmed: boolean

    userHasConfirmed = true
  if (!userHasConfirmed) {
    useNotification.getState().logError('Canceled by User', 'The operation is canceled by user')
    return
  }
  return txHandler(async ({ transactionCollector }) => {
    const { tempDataCache } = useConcentrated.getState()
    assert(tempDataCache, 'should create pool first')
    const createPoolInnerTransaction = tempDataCache
    const { innerTransactions: openPositionInnerTransaction } = await generateCreateClmmPositionTx(payload)
    transactionCollector.add(createPoolInnerTransaction, {
      txHistoryInfo: { title: 'Create pool', description: `create clmm pool` }
    })

    transactionCollector.add(openPositionInnerTransaction, {
      txHistoryInfo: { title: 'Open pool position', description: `Open clmm pool position` }
    })
  })
}
