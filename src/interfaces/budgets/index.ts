export interface IBudget {
  uuid: string
  name: string
  time: number
  budget: number
  fixedCost: number
  variableCost: number
  userId: string
  customerId: string
  stackId: string
  categoryId: string
}

export interface IBudgetUpdate {
  name?: string
  time?: number
  budget?: number
  fixedCost?: number
  variableCost?: number
}

export type IBudgetRequest = Omit<IBudget, 'uuid'>

