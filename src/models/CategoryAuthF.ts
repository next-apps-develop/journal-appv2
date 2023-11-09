import mongoose, { Schema, model, models } from 'mongoose'

const CategorySchemaNextAuthF = new Schema(
  {
    name: {
      type: String,
      required: [true, 'title is required']
    },

    color: {
      type: String,
      default: ''
    },

    status: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    userId: {
      type: mongoose.Types.ObjectId
    },
  },
  {
    timestamps: true
  }
)

const CategoryNextAuthF =
  models.CategorySchemaNextAuthF ||
  model('CategorySchemaNextAuthF', CategorySchemaNextAuthF)

export default CategoryNextAuthF
