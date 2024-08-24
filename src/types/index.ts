
export interface Company {
  id: number,
  title: string,
}

export interface Worker {
  id: number,
  firstName: string,
  lastName: string,
  surName: string,
  role: string,
  companyId: number
}
