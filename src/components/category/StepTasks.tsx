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
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full mt-4 input-container">
        <CreateTaskInput
          handleChangeTitle={handleChangeTitle}
          titleTask={titleTask}
          handleClickAdd={handleClickAddTaskCategory}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h3 className="mt-8 text-base font-bold ">Tareas agregadas</h3>
        {tasksFromCategory.map((task: Task) => (
          <div
            key={task._id}
            className="w-3/4 px-2 py-2 mt-4 bg-gray-200 rounded-md"
          >
            <p>{task.title}</p>
          </div>
        ))}
        {tasksFromCategory.length === 0 && (
          <>
            <p className="mt-4 text-sm ">
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
