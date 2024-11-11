import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    statics: {
      async register(username, email, password) {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        return this.create({ username, email, password: hashedPassword })
      },
      async authenticate(username, password) {
        const user = await this.findOne({
          $or: [{ username }, { email: username }],
        })

        if (!user) throw Error('User not found')

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('Invalid credentials')

        return { _id: user._id, username: user.username, email: user.email }
      },
    },
  }
)

const userDB = mongoose.connection.useDb('recipes')

export default userDB.model('User', userSchema)
