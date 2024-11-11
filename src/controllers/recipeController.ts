import { Request, Response } from 'express'
import { ExtendedRequest } from '../middleware/authMiddleware.js'
import Recipe from '../models/recipeModel.js'

/**
 * @desc    New Recipe
 * @route   POST /api/recipe/
 */
export const createRecipe = async (
  req: ExtendedRequest,
  res: Response,
  userId: string
) => {
  const { title, ingredients, directions, photoURL } = req.body

  try {
    const recipe = await Recipe.createRecipe(
      title,
      ingredients,
      directions,
      photoURL,
      userId
    )
    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Get All Recipes
 * @route   GET /api/recipe/
 */
export const getAllRecipes = async (
  req: ExtendedRequest,
  res: Response,
  userId: string
) => {
  try {
    const recipes = await Recipe.getAll(userId)
    res.status(201).json(recipes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Get Recipe
 * @route   GET /api/recipe/{:id}
 */
export const getRecipe = async (
  req: Request,
  res: Response,
  userId: string
) => {
  const id = null

  try {
    const recipes = await Recipe.getRecipe(id)
    res.status(201).json(recipes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//TODO: update recipe
//TODO: delete recipe
