import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    ingredients: Array,
    directions: Array,
    photoURL: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    methods: {
      updateRecipe() {
        //TODO updateRecipe
      },
      //TODO deleteRecipe
    },
    statics: {
      createRecipe(title, ingredients, directions, photoURL, userId) {
        //TODO data validation
        return this.create({ title, ingredients, directions, photoURL, userId })
      },
      getRecipe(id) {
        return this.findById(id)
      },
      getAll(userId) {
        return this.find({ userId })
      },
    },
  }
)

const recipeDB = mongoose.connection.useDb('recipes')

export default recipeDB.model('Recipe', recipeSchema)
