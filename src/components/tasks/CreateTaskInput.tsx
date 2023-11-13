import { FiPlus } from 'react-icons/fi'

const CreateTaskInput = ({
  handleChangeTitle,
  titleTask,
  handleClickAdd
}: any) => {
  return (
    <>
      <input
        type='text'
        placeholder='Add new task'
        className='!rounded-l-3xl !rounded-r-3xl '
        onChange={handleChangeTitle}
        name='title'
        maxLength={50}
      ></input>
      <div className='icon-plus'>
        {titleTask === '' ? (
          <FiPlus className='rounded-full bg-gray-500 mr-4 text-xl cursor-pointer' />
        ) : (
          <FiPlus
            className='rounded-full bg-blue-500 mr-4 text-xl cursor-pointer'
            onClick={handleClickAdd}
          />
        )}
      </div>
    </>
  )
}

export default CreateTaskInput
