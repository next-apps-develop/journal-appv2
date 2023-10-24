import { InferType, object, string } from "yup";

export const taskSchema= object({
    title: string().required().min(3).max(30),
    description: string().required().min(3).max(100),
    userId: string().required()

})

export type Person= InferType<typeof taskSchema>