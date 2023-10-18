import { Schema, model, models } from 'mongoose'

const UserSchemaNextAuthF = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email is not valid'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'password must be at least 6 characters'],

    select: false
  },
  fullName: {
    type: String,
    required: [true, 'Fullname is required'],
    minLength: [3, 'Full name must be at least 3 characters'],
    maxLength: [30, 'Full name must be at most 30 characters']
  }
})

const UserNextAuthF =
  models.UserSchemaNextAuthF ||
  model('UserSchemaNextAuthF', UserSchemaNextAuthF)

export default UserNextAuthF
