import { InferType, array, object, string } from 'yup'
import { taskSchema } from './task.schema'

export const categorySchema = object({
  name: string().required().max(30),
  userId: string().required(),
  color: string().required().max(30),
  icon: string().required().max(30),
  tasks: array().of(taskSchema).required()
})

export type Task = InferType<typeof categorySchema>
