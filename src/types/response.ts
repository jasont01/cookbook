import mongoose from 'mongoose'

interface User {
  user: {
    _id: mongoose.Types.ObjectId
    email: string
    username: string
  }
  accessToken?: string
}

interface Error {
  error: any
}

export type ResponseUser = User | Error
// export interface ResponseUser {
//   user: {
//     _id: mongoose.Types.ObjectId
//     email: string
//     username: string
//   }
//   accessToken: string
// }

// export interface ResponseError {
//   error: any
// }
