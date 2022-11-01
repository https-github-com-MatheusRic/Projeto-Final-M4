export interface IBudgetRequest {
  name: string
  time: number
  budget: number
  fixedCost: number
  variableCost: number
  userId: string
  costumerId: string
  stackId: string
  categoryId: string
}

export interface IBudget {
  id: string
  name: string
  time: number
  budget: number
  fixedCost: number
  variableCost: number
  userId: string
  costumerId: string
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
