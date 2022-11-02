import * as yup from "yup"
import { hashSync } from "bcryptjs"

const createUserSerializer = yup.object().shape({
    email: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    position: yup.string().required(),
    imageUrl: yup.string().notRequired()
})