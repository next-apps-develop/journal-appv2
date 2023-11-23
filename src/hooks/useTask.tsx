import { Task } from '@/app/interfaces/types'
import { useCategoryStore } from '@/app/store/useCategory'
import { useTasksStore } from '@/app/store/useTasks'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const useTask = () => {
  const [titleTask, settitleTask] = useState('')
  const [tasksFromCategory, settasksFromCategory] = useState<Task[]>([])
  const { data: session } = useSession()
  const setNewCategory = useCategoryStore(
    useShallow((state) => state.setNewCategory)
  )
  const newCategoryState = useCategoryStore(
    useShallow((state) => state.newCategoryState)
  )

  const categorySelected = useCategoryStore(
    useShallow((state) => state.categorySelected)
  )

  const createTask = useTasksStore(useShallow((state) => state.createTask))

  const handleClickAddTask = async () => {
    await createTask(
      { title: titleTask, categoryId: categorySelected._id },
      session
    )
  }

  const handleChangeTitle = (e: any) => {
    console.log('first::', e.target.value)
    settitleTask(e.target.value)
  }

  // TODO verify type of e parameter on react ts
  const handleClickAddTaskCategory = () => {
    settasksFromCategory((prev) => [
      ...prev,
      // @ts-ignore
      { title: titleTask, userId: session?.user?._id }
    ])
  }

  useEffect(() => {
    setNewCategory({ ...newCategoryState, tasks: tasksFromCategory })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksFromCategory])

  return {
    tasksFromCategory,
    titleTask,
    settitleTask,
    handleChangeTitle,
    handleClickAddTask,
    handleClickAddTaskCategory
  }
}
