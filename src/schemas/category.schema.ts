import { InferType, object, string } from "yup";

export const categorySchema= object({
    name: string().required().max(30),
    userId: string().required()

})

export type Task= InferType<typeof categorySchema>