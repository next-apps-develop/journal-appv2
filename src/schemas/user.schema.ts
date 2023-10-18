import { InferType, object, string } from "yup";

export const userSchema= object({
    fullName: string().required().min(3).max(30),
    password: string().required().min(6),
    email: string().required().email('this email is not valid')

})

export type Person= InferType<typeof userSchema>