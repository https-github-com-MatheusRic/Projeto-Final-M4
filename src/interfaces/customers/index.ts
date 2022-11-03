export interface ICustomerRequest {
  name: string
  isCompany?: boolean
  email?: string
  contact?: string
}

export interface ICustomerResponse {
  uuid: string
  name: string
  isCompany: boolean | null
  email: string | null
  contact: string | null
}

export interface ICustomerUpdate {
  name?: string
  isCompany?: boolean
  email?: string
  contact?: string
}