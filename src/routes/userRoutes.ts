import express from 'express'

import { verifyAccessToken } from '../middleware/authMiddleware.js'
import { newUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

/**
 * @route /api/users
 */

router.post('/register', newUser)
router.post('/login', loginUser)

//TODO: update user
//TODO: delete user

export default router
