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
}

export default new AccountService()
