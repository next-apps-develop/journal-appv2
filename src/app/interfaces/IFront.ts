
export interface ICategoryFront {
  _id?: string
  name?: string
  color?: string
  icon?: string
  userId?: string
  tasks?: ITaskFront[]
  tasksLeft?: number
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}


export interface ITaskFront {
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

