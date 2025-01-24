import { FiPlus } from 'react-icons/fi'

type CreateTaskInputProps = {
  handleChangeTitle: any
  titleTask: string
  handleClickAdd: any
}

const CreateTaskInput = ({
  handleChangeTitle,
  titleTask,
  handleClickAdd,
}: CreateTaskInputProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Add new task"
        className="!rounded-l-3xl !rounded-r-3xl "
        onChange={handleChangeTitle}
        name="title"
        maxLength={50}
        value={titleTask}
        data-testid="input-title-task"
      ></input>
      <div className="icon-plus">
        {titleTask === '' ? (
          <FiPlus
            className="mr-4 text-xl bg-gray-500 rounded-full cursor-pointer"
            data-testid="icon-plus-disable"
          />
        ) : (
          <FiPlus
            className="mr-4 text-xl bg-blue-500 rounded-full cursor-pointer"
            onClick={handleClickAdd}
            data-testid="icon-plus-enable"
          />
        )}
      </div>
    </>
  )
}

export default CreateTaskInput
