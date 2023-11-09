import { create } from 'zustand'
import { Task } from '../interfaces/types'
import { journalAPI } from '../utils/axiosConfig'
import { useSession } from 'next-auth/react'
interface State {
  tasks: Task[]
  // currentQuestion: number
  fetTasks: (session: any) => Promise<void>
  createTask: (task: Task, session: any) => Promise<void>
  taskShowOptions: (taskId: string) => void
  hideShowOptions: () => void
  deleteTask: (taskId: string, session: any) => Promise<void>

  // selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useTasksStore = create<State>((set, get) => {
  return {
    tasks: [],
    fetTasks: async (session) => {
      const res = await journalAPI.get(`/task/byUser`, {
        headers: {
          // @ts-ignore
          Authorization: session?.user.token || ''
        }
      })

      if (res.data && res.data.tasks) {
        set({
          tasks: res.data.tasks
        })
        // settasks(res.data.tasks)
      }
    },
    taskShowOptions: (taskId: string) => {
      const { tasks } = get()
      const tasksAux = tasks.map((task: Task) => {
        if (task._id === taskId) {
          return { ...task, showOptions: true }
        } else {
          return { ...task, showOptions: false }
        }
      })
      set({ tasks: tasksAux })
    },
    createTask: async (task: Task, session) => {
      try {
        const { tasks } = get()

        const res = await journalAPI.post(
          `/task`,
          {
            userId: session.user._id,
            title: task.title,
            description: task.description,
            categoryId: task.categoryId,
            status: false
          },
          {
            headers: {
              // @ts-ignore
              Authorization: session?.user.token || ''
            }
          }
        )

        console.log({ res })
        set({ tasks: [...tasks, res.data.task] })
      } catch (error) {
        console.log(error)
      }
    },

    hideShowOptions: () => {
      const { tasks } = get()

      set({ tasks: tasks.map((task) => ({ ...task, showOptions: false })) })
    },
    deleteTask: async (taskId: string, session) => {
      const { tasks } = get()
      set({ tasks: tasks.filter((task) => task._id !== taskId) })
    }
  }
})
