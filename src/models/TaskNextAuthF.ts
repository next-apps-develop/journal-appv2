import mongoose, { Schema, model, models } from 'mongoose'

const TaskSchemaNextAuthF = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId
    },
    categoryId: {
      type: mongoose.Types.ObjectId
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const TaskNextAuthF =
  models.TaskSchemaNextAuthF ||
  model('TaskSchemaNextAuthF', TaskSchemaNextAuthF)

export default TaskNextAuthF
