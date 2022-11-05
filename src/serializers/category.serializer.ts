import * as yup from "yup"

export const createCategorySerializer = yup.object().shape({
    name: yup.string().required()
})
