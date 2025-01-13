import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { useSession } from 'next-auth/react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from 'primereact/button'
import { useBoundStore } from '@/app/store/useBoundStore'

type ModalTaskProps = {
  showModalTask: boolean
  setshowModalTask: (value: boolean) => void
}

const ModalTask = ({ showModalTask, setshowModalTask }: ModalTaskProps) => {
  const { taskSelected, updateTask } = useBoundStore(useShallow(state => state))
  const [taskTitle, settaskTitle] = useState('')
  const [taskDescription, settaskDescription] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    settaskTitle(taskSelected.title || '')
    settaskDescription(taskSelected.description || '')
  }, [taskSelected])

  const handleUpdateTask = async () => {
    await updateTask(
      { ...taskSelected, title: taskTitle, description: taskDescription },
      session,
      false
    )
  }

  return (
    <>
      {Object.keys(taskSelected).length > 0 && (
        <Dialog
          header={() => <p>Edit task</p>}
          visible={showModalTask}
          style={{ width: '50vw' }}
          onHide={() => setshowModalTask(false)}
          className="modal-task max-w-[450px]"
          draggable={false}
          resizable={false}
        >
          <div className="mt-4 title-container">
            <label className="text-sm !my-4" htmlFor="">
              Title
            </label>
            <InputText
              value={taskTitle}
              onChange={e => settaskTitle(e.target.value)}
              className="modal-task-input "
            />
          </div>
          <div className="flex flex-col mt-4 description-container">
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
          <div className="flex justify-end mt-4 buttons-container">
            <Button
              link
              onClick={() => setshowModalTask(false)}
              className="px-4 py-2 mr-4"
            >
              Cancel
            </Button>

            <Button
              className="mr-4 px-4 py-2 bg-[#007bff] text-white"
              label="Submit"
              onClick={() => {
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
