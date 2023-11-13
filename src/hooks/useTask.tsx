import { Task } from '@/app/interfaces/types'
import { useTasksStore } from '@/app/store/tasks'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export const useTask = () => {
  const [titleTask, settitleTask] = useState('')
  const [tasksFromCategory, settasksFromCategory] = useState<Task[]>([])
  const { data: session } = useSession()

  const createTask = useTasksStore((state) => state.createTask)

  const handleClickAddTask = async () => {
    await createTask({ title: titleTask }, session)
  }

  const handleChangeTitle = (e: any) => {
    settitleTask(e.target.value)
  }

  // TODO verify type of e parameter on react ts
  const handleClickAddTaskCategory = (e: any) => {
    console.log('value::', titleTask)
    settasksFromCategory((prev) => [...prev, { title: titleTask }])
  }

  return {
    tasksFromCategory,
    titleTask,
    settitleTask,
    handleChangeTitle,
    handleClickAddTask,
    handleClickAddTaskCategory
  }
}
