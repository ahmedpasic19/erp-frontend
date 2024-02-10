import React from 'react'

import CompaniesForm from './companies-form'
import CompaniesTable from './companies-table'
import DeleteCompanyModal from './modals/DeleteCompanyModal'
import EditCompanyModal from './modals/EditCompanyModal'

export default function CompaniesPage() {
   return (
      <div className="page">
         <CompaniesForm />
         <CompaniesTable />

         <EditCompanyModal />
         <DeleteCompanyModal />
      </div>
   )
}
