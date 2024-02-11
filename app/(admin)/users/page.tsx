import React from 'react'

import DeleteUserodal from './modals/DeleteUserModal'
import EditUserodal from './modals/EditUserModal'
import UsersForm from './users-form'
import UsersTable from './users-table'

export default function UsersPage() {
   return (
      <div className="page">
         <UsersForm />
         <UsersTable />

         <EditUserodal />
         <DeleteUserodal />
      </div>
   )
}
