import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { useTasksStore } from '@/app/store/useTasks'
import { InputText } from 'primereact/inputtext'
import { useSession } from 'next-auth/react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from 'primereact/button'

interface modalTask {
  showModalTask: boolean
  setshowModalTask: any
}

const ModalTask = ({ showModalTask, setshowModalTask }: modalTask) => {
  const tasksSelected = useTasksStore(useShallow(state => state.taskSelected))
  const updateTask = useTasksStore(useShallow(state => state.updateTask))

  const [taskTitle, settaskTitle] = useState('')
  const [taskDescription, settaskDescription] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    settaskTitle(tasksSelected.title || '')
    settaskDescription(tasksSelected.description || '')
  }, [tasksSelected])

  const handleUpdateTask = async () => {
    await updateTask(
      { ...tasksSelected, title: taskTitle, description: taskDescription },
      session,
      false
    )
  }

  return (
    <>
      {Object.keys(tasksSelected).length > 0 && (
        <Dialog
          header={() => (
            <p>Edit task</p>

            // <InputText
            //   value={taskTitle}
            //   onChange={(e) => settaskTitle(e.target.value)}
            //   className='modal-task-input bg-transparent '
            // />
          )}
          visible={showModalTask}
          style={{ width: '50vw' }}
          onHide={() => setshowModalTask(false)}
          className="modal-task max-w-[450px]"
          draggable={false}
          resizable={false}
        >
          <div className="title-container mt-4">
            <label className="text-sm !my-4" htmlFor="">
              Title
            </label>
            <InputText
              value={taskTitle}
              onChange={e => settaskTitle(e.target.value)}
              className="modal-task-input "
            />
          </div>
          <div className="description-container flex flex-col mt-4">
            <label className="text-sm" htmlFor="">
              Description
            </label>

            <InputTextarea
              value={taskDescription}
              onChange={e => settaskDescription(e.target.value)}
              rows={5}
              placeholder="Enter a description"
              className="modal-task-description"
              // cols={30}
            />
          </div>
          <div className="buttons-container flex justify-end mt-4">
            {/* <ButtonGeneral
              text="Cancel"
              severity="danger"
              handleClick={() => setshowModalTask(false)}
            /> */}
            <Button
              link
              onClick={() => setshowModalTask(false)}
              className="mr-4 px-4 py-2"
            >
              Cancel
            </Button>

            <Button
              // onClick={() => setshowModalTask(false)}
              className="mr-4 px-4 py-2 bg-[#007bff] text-white"
              label="Submit"
              onClick={() => {
                handleUpdateTask()
                setshowModalTask(false)
              }}
            />
            {/* <ButtonGeneral
              text="Save"
              severity="info"
            /> */}
          </div>
        </Dialog>
      )}
    </>
  )
}

export default ModalTask
