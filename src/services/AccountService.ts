import { Repository } from 'typeorm'
import { Account } from '../entities/Account'
import DataSource from '../configs/database'

export class AccountService {
  repository: Repository<Account>

  constructor() {
    this.repository = DataSource.getRepository(Account)
  }

  async create(balance: number = 100): Promise<Account> {
    const account = this.repository.create({ balance })
    return this.repository.save(account)
  }

  async findById(id: string): Promise<Account> {
    return this.repository.findOne({ where: { id } })
  }

  async transferFound(
    debitedAccount: Account,
    creditedAccount: Account,
    amount: number
  ): Promise<Account[]> {
    const isSameAccount = debitedAccount.id === creditedAccount.id

    if (isSameAccount) {
      throw new Error('You can`t transfer founds to your own account')
    }

    const isBalanceLowerThanCashOutRequest = debitedAccount.balance < amount

    if (isBalanceLowerThanCashOutRequest) {
      throw new Error("You don't have enougth balance to make this transaction")
    }

    debitedAccount.balance = debitedAccount.balance - amount
    creditedAccount.balance = creditedAccount.balance + amount

    return await this.repository.save([debitedAccount, creditedAccount])
  }
}

export default new AccountService()
