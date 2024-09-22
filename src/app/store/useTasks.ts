import { create } from 'zustand'
import { Task } from '../interfaces/types'
import { journalAPI } from '../utils/axiosConfig'
interface State {
  tasks: Task[]
  taskSelected: Task
  tasksCompleted: Task[]
  tasksTodo: Task[]
  chooseTask: (task: Task) => void
  fetchTasks: (session: any) => Promise<void>
  createTask: (task: Task, session: any) => Promise<void>
  deleteTask: (taskId: string, session: any) => Promise<void>
  updateTask: (
    task: Task,
    session: any,
    isChangeCheck: boolean
  ) => Promise<void>
  changeTasksByCategory: (id: string, session: any) => Promise<void>
}

export const useTasksStore = create<State>((set, get) => {
  return {
    tasks: [],
    taskSelected: {},
    tasksCompleted: [],
    tasksTodo: [],
    fetchTasks: async session => {
      const res = await journalAPI.post(
        `/task/query`,
        { category: '' },
        {
          headers: {
            Authorization: session?.user.token || '',
          },
        }
      )

      if (res.data && res.data.tasks) {
        set({
          tasks: res.data.tasks,
          tasksCompleted: res.data.tasks.filter(
            (task: Task) => task.status === true
          ),
          tasksTodo: res.data.tasks.filter(
            (task: Task) => task.status === false
          ),
        })
      }
    },

    createTask: async (task: Task, session) => {
      try {
        const { tasks, tasksTodo } = get()

        const res = await journalAPI.post(
          `/task`,
          {
            userId: session.user._id,
            title: task.title,
            description: task.description,
            categoryId: task.categoryId,
            status: false,
          },
          {
            headers: {
              Authorization: session?.user.token || '',
            },
          }
        )

        set({ tasks: [...tasks, res.data.task] })
        set({ tasksTodo: [...tasksTodo, res.data.task] })
      } catch (error) {
        console.log(error)
      }
    },

    deleteTask: async (taskId: string, session) => {
      const { tasksCompleted, tasksTodo } = get()
      try {
        const res = await journalAPI.delete(`/task/${taskId}`, {
          headers: {
            Authorization: session?.user.token || '',
          },
        })

        if (res && res.data.msg === 'ok') {
          set({
            tasksCompleted: tasksCompleted.filter(task => task._id !== taskId),
          })
          set({ tasksTodo: tasksTodo.filter(task => task._id !== taskId) })
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateTask: async (taskCurrent: Task, session, isChangeCheck) => {
      const { tasks, tasksCompleted, tasksTodo } = get()
      try {
        const res = await journalAPI.put(
          `/task/${taskCurrent._id}`,
          {
            userId: session.user._id,
            title: taskCurrent.title,
            description: taskCurrent.description,
            categoryId: taskCurrent.categoryId,
            status: taskCurrent.status,
          },
          {
            headers: {
              Authorization: session?.user.token || '',
            },
          }
        )

        if (res && res.data.msg === 'ok' && res.data.task) {
          set({
            tasks: tasks.map((task: Task) => {
              if (task._id === taskCurrent._id) {
                return {
                  ...task,
                  title: res.data.task.title,
                  description: res.data.task.description,
                  status: res.data.task.status,
                }
              } else {
                return { ...task }
              }
            }),
          })
          // if task is on todo tasks
          if (res.data.task.status) {
            set({
              tasksCompleted: tasksCompleted.map((task: Task) => {
                if (task._id === taskCurrent._id) {
                  return {
                    ...task,
                    title: res.data.task.title,
                    description: res.data.task.description,
                    status: res.data.task.status,
                  }
                } else {
                  return { ...task }
                }
              }),
            })
          } else {
            set({
              tasksTodo: tasksTodo.map((task: Task) => {
                if (task._id === taskCurrent._id) {
                  return {
                    ...task,
                    title: res.data.task.title,
                    description: res.data.task.description,
                    status: res.data.task.status,
                  }
                } else {
                  return { ...task }
                }
              }),
            })
          }

          // si se hace check
          if (isChangeCheck) {
            if (taskCurrent.status) {
              set({
                tasksTodo: tasksTodo.filter(
                  (task: Task) => task._id !== taskCurrent._id
                ),
                tasksCompleted: [res.data.task, ...tasksCompleted],
              })
            } else {
              set({
                tasksCompleted: tasksCompleted.filter(
                  (task: Task) => task._id !== taskCurrent._id
                ),
                tasksTodo: [...tasksTodo, res.data.task],
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    chooseTask: (task: Task) => {
      set({ taskSelected: task })
    },
    changeTasksByCategory: async (id: string, session) => {
      const res = await journalAPI.post(
        `/task/query`,
        { categoryId: id },
        {
          headers: {
            Authorization: session?.user.token || '',
          },
        }
      )

      if (res.data && res.data.tasks) {
        set({
          tasks: res.data.tasks,
          tasksCompleted: res.data.tasks.filter(
            (task: Task) => task.status === true
          ),
          tasksTodo: res.data.tasks.filter(
            (task: Task) => task.status === false
          ),
        })
        // settasks(res.data.tasks)
      }
    },
  }
})
