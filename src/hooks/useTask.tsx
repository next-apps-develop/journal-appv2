import { Task } from '@/app/interfaces/types'
import { useBoundStore } from '@/app/store/useBoundStore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const useTask = () => {
  const [titleTask, settitleTask] = useState('')
  const [tasksFromCategory, settasksFromCategory] = useState<Task[]>([])
  const { data: session } = useSession()
  const {
    createTask,
    fetchCategories,
    categorySelected,
    newCategoryState,
    setNewCategory,
  } = useBoundStore(useShallow(state => state))

  const handleClickAddTask = async () => {
    await createTask(
      { title: titleTask, categoryId: categorySelected._id },
      session
    )

    if (categorySelected._id === undefined) {
      await fetchCategories(session)
    }
    settitleTask('')
  }

  const handleChangeTitle = (e: any) => {
    settitleTask(e.target.value)
  }

  // TODO verify type of e parameter on react ts
  const handleClickAddTaskCategory = () => {
    settasksFromCategory(prev => [
      ...prev,
      // @ts-ignore
      { title: titleTask, userId: session?.user?._id },
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
    handleClickAddTaskCategory,
  }
}
