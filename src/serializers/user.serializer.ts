import * as yup from "yup"

export const createUserSerializer = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    position: yup.string().required(),
    imageUrl: yup.string().notRequired()
})