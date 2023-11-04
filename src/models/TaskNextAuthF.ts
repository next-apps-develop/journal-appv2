import mongoose, { Schema, model, models } from 'mongoose'

const TaskSchemaNextAuthF = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    userId: {
      type: mongoose.Types.ObjectId
    },
    status: {
      type: Boolean,
      default: false
    }
    // image: {
    //     type: String,
    // }

    // email: {
    //   type: String,
    //   unique: true,
    //   required: [true, 'email is required'],
    //   match: [
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //     'Email is not valid'
    //   ]
    // },
    // password: {
    //   type: String,
    //   required: [true, 'Password is required'],
    //   minLength: [6, 'password must be at least 6 characters'],

    //   select: false
    // },
    // fullName: {
    //   type: String,
    //   required: [true, 'Fullname is required'],
    //   minLength: [3, 'Full name must be at least 3 characters'],
    //   maxLength: [30, 'Full name must be at most 30 characters']
    // }
  },
  {
    timestamps: true
  }
)

const TaskNextAuthF =
  models.TaskSchemaNextAuthF ||
  model('TaskSchemaNextAuthF', TaskSchemaNextAuthF)

export default TaskNextAuthF
