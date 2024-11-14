import express from 'express'
import { verifyAccessToken } from './middleware/authMiddleware.js'
import { newUser, loginUser } from './controllers/userController.js'
import { createRecipe, getAllRecipes } from './controllers/recipeController.js'

const router = express.Router()

/**
 * @route /api/user
 */
router.post('/user/register', newUser)
router.post('/user/login', loginUser)

//TODO: update user
//TODO: delete user

/**
 * @route /api/recipe
 */
router.post('/recipe/', verifyAccessToken, createRecipe)
router.get('/recipe/', verifyAccessToken, getAllRecipes)

export default router
