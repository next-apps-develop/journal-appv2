export interface ICategoryBack {
  _id?: string
  name?: string
  color?: string
  icon?: string
  userId?: string
  tasks?: ITaskBack[]
  tasksLeft?: number
}


export interface ITaskBack {
  _id?: string
  title?: string
  description?: string
  userId?: string
  categoryId?: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
  showOptions?: boolean
}

