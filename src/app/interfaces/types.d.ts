
export interface Task {
    _id?: string
    title: string
    description?: string
    userId?: string
    categoryId?: string
    status?: boolean
    createdAt?: Date
    updatedAt?: Date,

    showOptions?: boolean
  }
  