import { Repository } from 'typeorm'
import { Transaction } from '../entities/Transaction'
import DataSource from '../configs/database'
import accountService, { AccountService } from './AccountService'
import userService, { UserService } from './UserService'
import { isSameDay } from 'date-fns'

export class TransactionService {
  private repository: Repository<Transaction>
  private accountService: AccountService
  private userService: UserService

  constructor() {
    this.repository = DataSource.getRepository(Transaction)
    this.accountService = accountService
    this.userService = userService
  }

  transferFounds = async (
    userId: string,
    creditedUsername: string,
    amount: number
  ) => {
    const user = await this.userService.findById(userId)

    const creditedUser = await this.userService.findByUsername(creditedUsername)
    console.log(creditedUsername)

    if (!user || !creditedUser) {
      throw new Error('User not found')
    }

    const debitedAccount = user.account
    const creditedAccount = creditedUser.account

    await accountService.transferFounds(debitedAccount, creditedAccount, amount)

    const transaction = this.repository.create({
      creditedAccount,
      debitedAccount,
      value: amount,
      createdAt: new Date(),
    })

    return this.repository.save(transaction)
  }

  getAllTransfers = async (
    userId: string,
    referenceDate: string,
    transactionType: string
  ): Promise<Transaction[]> => {
    const user = await this.userService.findByUsernameWithAllInfo(userId)
    const account = user.account
    let transactions: Transaction[] = []

    const transactionTypeExists = !!transactionType
    const hasTransactionTypeCorrectEnum = ['I', 'O'].includes(transactionType)

    if (transactionTypeExists && hasTransactionTypeCorrectEnum) {
      transactions =
        transactionType === 'I'
          ? account.creditedTransactions
          : account.debitedTransactions
    } else {
      transactions = [
        ...account.creditedTransactions,
        ...account.debitedTransactions,
      ]
    }

    if (referenceDate) {
      transactions = transactions.filter((transaction) =>
        isSameDay(transaction.createdAt, new Date(referenceDate))
      )
    }

    return transactions
  }
}

export default new TransactionService()
