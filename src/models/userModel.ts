import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    methods: {},
    statics: {
      async register(username, email, password) {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        return this.create({ username, email, password: hashedPassword })
      },
    },
  }
)

const userDB = mongoose.connection.useDb('recipes')

export default userDB.model('User', userSchema)
