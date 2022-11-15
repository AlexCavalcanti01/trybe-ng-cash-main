import { Router, Request, Response } from 'express'
import { request } from 'http'
import UserController from './controllers/UserController'
import { User } from './entities/User'

const router = Router()

router.post('/users', (req: Request, res: Response) =>
  UserController.store(req, res)
)

router.post('/users/token/validate', (req: Request, res: Response) =>
  UserController.validateToken(req, res)
)

router.post('/signin', (req: Request, res: Response) =>
  UserController.login(req, res)
)
export { router }
