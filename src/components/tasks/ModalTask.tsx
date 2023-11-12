import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { useTasksStore } from '@/app/store/tasks'
import { InputText } from 'primereact/inputtext'
import ButtonGeneral from '../ButtonGeneral'
import { useSession } from 'next-auth/react'

interface modalTask {
  showModalTask: boolean
  setshowModalTask: Function
}

const ModalTask = ({ showModalTask, setshowModalTask }: modalTask) => {
  const tasksSelected = useTasksStore((state) => state.tasksSelected)
  const updateTask = useTasksStore((state) => state.updateTask)

  const [taskTitle, settaskTitle] = useState('')
  const [taskDescription, settaskDescription] = useState('')
  const { data: session, status } = useSession()

  useEffect(() => {
    settaskTitle(tasksSelected.title || '')
    settaskDescription(tasksSelected.description || '')
  }, [tasksSelected])

  console.log({ tasksSelected })

  const handleUpdateTask = async () => {
    await updateTask(
      { ...tasksSelected, title: taskTitle, description: taskDescription },
      session
    )
  }

  return (
    <>
      {Object.keys(tasksSelected).length > 0 && (
        <Dialog
          header={() => (
            <InputText
              value={taskTitle}
              onChange={(e) => settaskTitle(e.target.value)}
              className='modal-task-input bg-transparent text-white'
            />
          )}
          visible={showModalTask}
          style={{ width: '50vw' }}
          onHide={() => setshowModalTask(false)}
          className='modal-task'
          draggable={false}
          resizable={false}
        >
          <InputTextarea
            value={taskDescription}
            onChange={(e) => settaskDescription(e.target.value)}
            rows={10}
            placeholder='Description'
            className='modal-task-description'
            // cols={30}
          />
          <div className='buttons-container flex justify-between'>
            <ButtonGeneral
              text='Cancel'
              severity='danger'
              handleClick={() => setshowModalTask(false)}
            />
            <ButtonGeneral
              text='Save'
              severity='info'
              handleClick={() => {
                handleUpdateTask()
                setshowModalTask(false)
              }}
            />
          </div>
        </Dialog>
      )}
    </>
  )
}

export default ModalTask
