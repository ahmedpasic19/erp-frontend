import { UsersInCompanies } from '@/schemas/relations/users-in-companies.interface'

export interface User {
   id: string
   name: string
   password: string
   email: string
   companies: UsersInCompanies[]
}
