import jwt from 'jsonwebtoken'
import { Request, Response, CookieOptions } from 'express'
import User from '../models/userModel.js'
//import { ResponseUser } from '../types/response.js'

const cookieOptions: CookieOptions = {
  maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
  secure: process.env.NODE_ENV === 'production',
}

/**
 * @desc    Login user
 * @route   POST /api/users/login
 */
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = await User.authenticate(username, password)

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    res
      .status(200)
      .cookie('token', refreshToken, cookieOptions)
      .json({ user, accessToken })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 */
export const newUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  try {
    const user = await User.register(username, email, password)

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
