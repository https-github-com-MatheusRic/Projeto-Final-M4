export interface ICustomerRequest {
  name: string
  isCompany?: boolean
  email: string
  contact?: string
}

export interface ICustomerResponse {
  uuid: string
  name: string
  isCompany: boolean | null
  email: string
  contact: string | null
  userId: string
}

export interface ICustomerUpdate {
  name?: string
  isCompany?: boolean
  email?: string
  contact?: string
}