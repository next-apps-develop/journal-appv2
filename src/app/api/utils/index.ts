import TaskNextAuthF from '../../../models/TaskNextAuthF'
import { ICategoryBack } from '../../interfaces/IBack.js'

export const getTasksLeftCategory = async (categories: ICategoryBack[]) => {
  let categoriesAux: ICategoryBack[] = await Promise.all(
    categories.map(async (category: ICategoryBack) => {
      const tasks = await TaskNextAuthF.find({ categoryId: category._id })
      console.log({ tasks })

      const tasksLeft = tasks.filter(task => task.status === false).length
      console.log({ category, tasksLeft })

      return { ...category, tasksLeft }
    })
  )
  categoriesAux = categoriesAux.map(category => {
    //@ts-ignore
    return { ...category._doc, tasksLeft: category.tasksLeft }
  })
  return categoriesAux
}
