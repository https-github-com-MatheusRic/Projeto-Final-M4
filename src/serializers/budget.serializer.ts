import * as yup from "yup"

export const createBudgetSerializer = yup.object().shape({
    projectName: yup.string().required(),
    projectTime: yup.number().positive().required(),
    budget: yup.number().positive().required(),
    fixedCost: yup.number().positive().required(),
    variableCost: yup.number().positive().required(),
    userId: yup.string().required(),
    categoryId: yup.string().required(),
    customerId: yup.string().required(),
    budgetStackId: yup.string().required()
})
