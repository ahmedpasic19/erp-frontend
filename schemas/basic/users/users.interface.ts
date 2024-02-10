import { Company } from '../companies/companies.interface'

import { UsersInCompanies } from '@/schemas/relations/users-in-companies.interface'

export interface User {
   is: number
   name: string
   password: string
   email: string
   companies_id: number
   companies: Company[]
   users_in_companies: UsersInCompanies[]
}
