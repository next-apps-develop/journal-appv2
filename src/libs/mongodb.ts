import mongoose from 'mongoose'

const { MONGODB_ATLAS } = process.env

if (!MONGODB_ATLAS) {
  throw new Error('MONGODB_ATLAS must be defined')
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_ATLAS || '')
    if (connection.readyState === 1) {
      console.log('Data base connect')
      return Promise.resolve(true)
    }
  } catch (error) {
    console.log({ error })
    return Promise.reject(false)
  }
}
