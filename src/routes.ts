import { Router, Request, Response, NextFunction } from 'express'
import TransactionController from './controllers/TransactionController'
import UserController from './controllers/UserController'
import authenticationService from './services/AuthenticationService'

const router = Router()

const takeUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string

  if (!token) {
    res.status(403).send({ message: 'Token not found' })
  }

  const data = authenticationService.decryptToken(token)
  req.params.userId = data.userId

  next()
}

router.post('/users', (req: Request, res: Response) =>
  UserController.store(req, res)
)

router.post('/users/token/validate', (req: Request, res: Response) =>
  UserController.validateToken(req, res)
)

router.post('/signin', (req: Request, res: Response) =>
  UserController.login(req, res)
)

router.post('/transactions/cashout', takeUser, (req: Request, res: Response) =>
  TransactionController.handleCashOut(req, res)
)

router.get('/users/accounts/balance', takeUser, (req: Request, res: Response) =>
  UserController.getBalance(req, res)
)

router.get('/users/transactions', takeUser, (req: Request, res: Response) =>
  TransactionController.getTransfers(req, res)
)

export { router }
