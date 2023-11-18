export interface Task {
  _id?: string
  title?: string
  description?: string
  userId?: string
  categoryId?: strings
  status?: boolean
  createdAt?: Date
  updatedAt?: Date

  showOptions?: boolean
}

export interface Category {
  _id?: string
  name?: string
  color?: string
  icon?: string
  userId?: string
  tasks?: Task[]
}

