import { Request, Response } from 'express'
import Recipe from '../models/recipeModel.js'

export const createRecipe = async (req: Request, res: Response) => {
  const { title, ingredients, directions, photoURL } = req.body
  //const id = req.session.userId
  const id = null

  try {
    const recipe = await Recipe.createRecipe(
      title,
      ingredients,
      directions,
      photoURL,
      id
    )
    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllRecipes = async (req: Request, res: Response) => {
  //const id = req.session.userId
  const id = null

  try {
    const recipes = await Recipe.getAll(id)
    res.status(201).json(recipes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
