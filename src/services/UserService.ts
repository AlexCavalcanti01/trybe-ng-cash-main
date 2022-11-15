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

    const doesPasswordMatch = this.authenticationService.compare(
      persistedUser.password,
      password
    )

    if (!doesPasswordMatch) {
      throw new Error("Password doesn/'t match")
    }

    const token = this.authenticationService.encodeToken(persistedUser.id)

    console.log(token)

    return { token }
  }

  async create(username: string, password: string): Promise<User> {
    if (username.length < 3) {
      throw new Error('Username should be at last length 3')
    }

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

  validateToken(token: string): boolean {
    return !!this.authenticationService.isTokenExpired(token)
  }
}

export default new UserService()
