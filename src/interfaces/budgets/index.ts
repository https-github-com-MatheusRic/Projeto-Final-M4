export interface IBudget {
  uuid: string
  projectName: string
  projectTime: number
  budget: number
  fixedCost: number
  variableCost: number
  userId: string
  categoryId: string
  customerId: string
  budgetStackId: string
}

export interface IBudgetUpdate {
  projectName?: string
  projectTime?: number
  budget?: number
  fixedCost?: number
  variableCost?: number
}

export type IBudgetRequest = Omit<IBudget, ('uuid' | 'userId')>

