import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface ExtendedRequest extends Request {
  userId: string
}

export const verifyRefreshToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
      ) as JwtPayload

      const { userId } = decoded

      req.userId = userId

      next()
    } catch (error) {
      res.status(403).json({ error: error.message })
    }
  } else {
    res.sendStatus(204)
  }
}

export const verifyAccessToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as JwtPayload

      const { userId } = decoded

      req.userId = userId

      next()
    } catch (error) {
      res.status(403).json({ error: error.message })
    }
  } else {
    res.sendStatus(401)
  }
}
