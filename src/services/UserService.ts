import { Repository } from 'typeorm'
import { User } from '../entities/User'
import DataSource from '../configs/database'
import accountService, { AccountService } from './AccountService'
import authenticationService, {
  AuthenticationService,
} from './AuthenticationService'

export class UserService {
  private userRepository: Repository<User>
  private accountService: AccountService
  private authenticationService: AuthenticationService

  constructor() {
    this.userRepository = DataSource.getRepository(User)
    this.accountService = accountService
    this.authenticationService = authenticationService
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const persistedUser = await this.userRepository.findOne({
      where: { username },
    })

    if (!persistedUser) {
      throw new Error('User not found')
    }

    const doesPasswordMatch = await this.authenticationService.compare(
      persistedUser.password,
      password
    )

    if (!doesPasswordMatch) {
      throw new Error("Password doesn/'t match")
    }

    const token = this.authenticationService.encodeToken(persistedUser.id)

    return { token }
  }

  async create(username: string, password: string): Promise<User> {
    const persistedUser = await this.userRepository.find({
      where: { username },
    })

    if (persistedUser.length > 0) {
      throw new Error('Username is already persisted')
    }

    const account = await this.accountService.create()
    const hashedPassword = await this.authenticationService.encrypt(password)

    const user = this.userRepository.create({
      account,
      password: hashedPassword,
      username,
    })

    return this.userRepository.save(user)
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { account: true },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user.account.balance
  }

  validateToken(token: string): boolean {
    return !!this.authenticationService.isTokenExpired(token)
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: { account: true },
    })
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username: username },
      relations: { account: true },
    })
  }

  async findByUsernameWithAllInfo(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        account: { creditedTransactions: true, debitedTransactions: true },
      },
    })
  }
}

export default new UserService()
