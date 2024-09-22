import React from 'react'
import CreateTaskInput from '../tasks/CreateTaskInput'
import { useTask } from '@/hooks/useTask'
import { Task } from '@/app/interfaces/types'

const StepTasks = () => {
  const {
    handleChangeTitle,
    titleTask,
    handleClickAddTaskCategory,
    tasksFromCategory,
  } = useTask()
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="input-container mt-4 relative w-full">
        <CreateTaskInput
          handleChangeTitle={handleChangeTitle}
          titleTask={titleTask}
          handleClickAdd={handleClickAddTaskCategory}
        />
      </div>
      <div className="w-full flex justify-center flex-col items-center">
        <h3 className=" mt-8 text-base font-bold">Tareas agregadas</h3>
        {tasksFromCategory.map((task: Task) => (
          <div
            key={task._id}
            className="mt-4 bg-gray-200 px-2 py-2 rounded-md w-3/4"
          >
            <p>{task.title}</p>
          </div>
        ))}
        {tasksFromCategory.length === 0 && (
          <>
            <p className=" text-sm mt-4">
              No ha agregado tareas para esta categoria, escriba un tarea y
              pulse sobre el boton +
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default StepTasks
