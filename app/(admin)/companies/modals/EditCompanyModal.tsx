'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import CompaniesForm from '../companies-form'

import { useGetOneCompanyQuery } from '@/app/_services/basic/companies-api'
import Modal from '@/components/root/modal'
import { Company } from '@/schemas/basic/companies/companies.interface'

const EditCompanyModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const companyId = searchParams.get('companyId')

   const { data } = useGetOneCompanyQuery({ id: +companyId! }, { skip: !companyId })

   return (
      <Modal open={companyId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit youre company" desc="Here is where you can edit youre company.">
            <CompaniesForm isEdit company={data?.company || ({} as Company)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditCompanyModal
