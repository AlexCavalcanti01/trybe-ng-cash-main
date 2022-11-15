import { isValid } from 'date-fns/esm'
import { Request, Response } from 'express'
import userService, { UserService } from '../services/UserService'

class UserController {
  userService: UserService

  constructor() {
    this.userService = userService
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await this.userService.login(username, password)
    return res.send(token)
  }

  validateToken = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.body
    const isValid = this.userService.validateToken(token)
    return res.send({ isValid })
  }

  store = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body
    try {
      const user = await this.userService.create(username, password)
      return res.json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
}

export default new UserController()
