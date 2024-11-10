import express from 'express'

//const { verifyAccessToken } = require('../middleware/authMiddleware')
import { newUser } from '../controllers/userController.js'

const router = express.Router()

/**
 * @route /api/users
 */

//router.post('/register', validateUsername, validateEmail, registerUser)
router.post('/register', newUser)

export default router
