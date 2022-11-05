import * as yup from "yup"

export const createCustomerSerializer = yup.object().shape({
    name: yup.string().required(),
    isCompany: yup.boolean().notRequired(),
    email: yup.string().email().required(),
    contact: yup.string().notRequired()
})