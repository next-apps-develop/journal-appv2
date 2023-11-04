import { journalAPI } from '@/app/utils/axiosConfig'
import { useSession } from 'next-auth/react'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import './index.css'
import { FiEdit2, FiTrash } from 'react-icons/fi'
interface Task {
  _id: string
  title: string
}
const Tasks = () => {
  const { data: session, status } = useSession()
  const [tasks, settasks] = useState<Task[]>([])

  useEffect(() => {
    const getTasksUser = async () => {
      // @ts-ignore
      const res = await journalAPI.get(`/task/byUser`)

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
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus beatae incidunt pariatur fugiat maxime optio
                  distinctio natus debitis ratione! Eos adipisci ea, labore
                  veritatis sint dolorum temporibus! Eius, nulla quasi.
  `
  return (
    <Card
      title={() => <h1 className='text-center'>Tasks</h1>}
      className='h-full w-full menu-card'
    >
      {tasks.length > 0 && (
        <>
          {tasks.map((task) => (
            <div className='task-item-container ' key={task._id}>
              <div className='task-item flex justify-between items-center'>
                {/* <p>{task.title}</p> */}
                <p>{task.title.slice(0, 30)}</p>
                <div className='tools-task flex'>
                  <FiTrash className='mx-4 text-xl' />
                  <FiEdit2 className='mr-4 text-xl' />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </Card>
  )
}

export default Tasks
