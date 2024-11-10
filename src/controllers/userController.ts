import { Request, Response } from 'express'
import User from '../models/userModel.js'

export const newUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  try {
    const user = await User.register(username, email, password)

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}