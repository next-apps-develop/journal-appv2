import { Task } from '../interfaces/types'
import { journalAPI } from '../utils/axiosConfig'
export interface StateTasks {
  tasksByCategory: Task[]
  taskSelected: Task
  tasksByCategoryCompleted: Task[]
  tasksByCategoryTodo: Task[]
  tasksTodo: number

  chooseTask: (task: Task) => void
  fetchAllTasks: (session: any) => Promise<void>
  createTask: (task: Task, session: any) => Promise<void>
  deleteTask: (taskId: string, session: any) => Promise<void>
  updateTask: (
    task: Task,
    session: any,
    isChangeCheck: boolean
  ) => Promise<void>
  fetchTasksByCategory: (id: string, session: any) => Promise<void>
}

export const useTasksStore = (set: any, get: any) => {
  return {
    tasksByCategory: [],
    taskSelected: {},
    tasksByCategoryCompleted: [],
    tasksByCategoryTodo: [],
    tasksTodo: 0,
    fetchAllTasks: async (session: any) => {
      const res = await journalAPI.post(
        `/task/query`,
        { categoryId: '' },
        {
          headers: {
            Authorization: session?.user.token || '',
          },
        }
      )
      if (res.data && res.data.tasks) {
        set({
          tasksTodo: res.data.tasks.filter(
            (task: Task) => task.status === false
          ).length,
        })
      }
    },

    createTask: async (task: Task, session: any) => {
      try {
        const { tasksByCategory, tasksByCategoryTodo } = get()

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

        set({ tasksByCategory: [...tasksByCategory, res.data.task] })
        set({ tasksByCategoryTodo: [...tasksByCategoryTodo, res.data.task] })
      } catch (error) {
        console.log(error)
      }
    },

    deleteTask: async (taskId: string, session: any) => {
      const { tasksByCategoryCompleted, tasksByCategoryTodo } = get()
      try {
        const res = await journalAPI.delete(`/task/${taskId}`, {
          headers: {
            Authorization: session?.user.token || '',
          },
        })

        if (res && res.data.msg === 'ok') {
          set({
            tasksByCategoryCompleted: tasksByCategoryCompleted.filter(
              (task: Task) => task._id !== taskId
            ),
          })
          set({
            tasksByCategoryTodo: tasksByCategoryTodo.filter((task: Task) => task._id !== taskId),
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateTask: async (
      taskCurrent: Task,
      session: any,
      isChangeCheck: boolean
    ) => {
      const {
        tasksByCategory,
        tasksByCategoryCompleted,
        tasksByCategoryTodo,
        tasksTodo
      } = get()
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
            tasks: tasksByCategory.map((task: Task) => {
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
              tasksByCategoryCompleted: tasksByCategoryCompleted.map((task: Task) => {
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
              tasksByCategoryTodo: tasksByCategoryTodo.map((task: Task) => {
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
                tasksByCategoryTodo: tasksByCategoryTodo.filter(
                  (task: Task) => task._id !== taskCurrent._id
                ),
                tasksByCategoryCompleted: [res.data.task, ...tasksByCategoryCompleted],
                // tasksTodo: tasksTodo - 1
              })
            } else {
              set({
                tasksByCategoryCompleted: tasksByCategoryCompleted.filter(
                  (task: Task) => task._id !== taskCurrent._id
                ),
                tasksByCategoryTodo: [...tasksByCategoryTodo, res.data.task],
                // tasksTodo: tasksTodo + 1
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
    fetchTasksByCategory: async (id: string, session: any) => {
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
          tasksByCategory: res.data.tasks,
          tasksByCategoryCompleted: res.data.tasks.filter(
            (task: Task) => task.status === true
          ),
          tasksByCategoryTodo: res.data.tasks.filter(
            (task: Task) => task.status === false
          ),
        })
        // settasks(res.data.tasks)
      }
    },
  }
}
