import bcrypt from 'bcrypt'
import { addDays, addHours, compareAsc } from 'date-fns'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class AuthenticationService {
  private SALT = 10
  private JWT_SECRET_KEY = 'df2f5c96-df9d-4b46-958a-31278adf804d'

  encrypt = async (password: string) => {
    return await bcrypt.hash(password, this.SALT)
  }

  compare = async (savedPassword, password: string) => {
    return await bcrypt.compare(password, savedPassword)
  }

  encodeToken(userId: string): string {
    const data = {
      time: new Date(),
      userId,
    }

    const token = jwt.sign(data, this.JWT_SECRET_KEY)

    return token
  }

  isTokenExpired(token: string): boolean {
    var decoded = jwt.verify(token, this.JWT_SECRET_KEY)
    if (!decoded) {
      throw new Error('Token not valid')
    }
    const tokenTime = new Date((decoded as JwtPayload).time)
    const expirationDate = addHours(tokenTime, 24)
    return compareAsc(expirationDate, new Date()) >= 0
  }
}

export default new AuthenticationService()
