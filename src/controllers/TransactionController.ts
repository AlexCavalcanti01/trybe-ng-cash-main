import { Request, Response } from 'express'
import transactionService, {
  TransactionService,
} from '../services/TransactionService'

class TransactionController {
  private transactionService: TransactionService

  constructor() {
    this.transactionService = transactionService
  }

  handleCashOut = async (req: Request, res: Response) => {
    const { username, amount } = req.body
    const { userId } = req.params

    try {
      const transaction = await transactionService.transferFounds(
        userId,
        username,
        amount
      )
      return res.status(200).json({ operationId: transaction.id })
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  getTransfers = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { date, type } = req.query as { date: string; type: string }

    try {
      const transactions = await transactionService.getAllTransfers(
        userId,
        date,
        type
      )
      return res.json(transactions)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
}

export default new TransactionController()
