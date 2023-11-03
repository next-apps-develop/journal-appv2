import { journalAPI } from '@/app/utils/axiosConfig'
import { useSession } from 'next-auth/react'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
}
const Tasks = () => {
  const { data: session, status } = useSession()
  const [tasks, settasks] = useState<Task[]>([])

  useEffect(() => {
    const getTasksUser = async () => {
      // @ts-ignore
      const res = await journalAPI.get(`/task/byUser/${session!.user!._id}`)

      if (res.data && res.data.tasks) {
        settasks(res.data.tasks)
      }
    }
    if (session?.user) {
      console.log({ SESSION: session })
      getTasksUser()
    }
  }, [session])

  console.log({ tasks })
  return (
    <Card
      title={() => <h1 className='text-center'>Tasks</h1>}
      className='h-full w-full menu-card'
    >
      {tasks.length > 0 && (
        <>
          {tasks.map((task) => (
            <div className='task-item' key={task.id}>
              <p>{task.title}</p>
            </div>
          ))}
        </>
      )}
    </Card>
  )
}

export default Tasks
