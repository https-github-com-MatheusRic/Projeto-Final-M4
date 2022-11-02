import * as yup from "yup"

export const createBudgetStackSerializer = yup.object().shape({
    stack: yup.string().notRequired()
})