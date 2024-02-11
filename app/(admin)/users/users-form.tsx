'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useGetAllCompaniesQuery } from '@/app/_services/basic/companies-api'
import { useCreateUserMutation, useUpdateUserMutation } from '@/app/_services/basic/users-api'
import Button from '@/components/root/button'
import SelectField from '@/components/root/select-field'
import TextField from '@/components/root/text-filed'
import { User } from '@/schemas/basic/users/users.interface'
import { createUserSchema, updateUserSchema } from '@/schemas/basic/users/users.schema'

type TProps = {
   isEdit?: boolean
   user?: User
}

const UsersForm = ({ isEdit, user }: TProps) => {
   const methods = useForm<createUserSchema>({
      resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
      values: isEdit && user ? user : ({} as User),
   })

   const { handleSubmit, reset, setValue, watch } = methods

   const router = useRouter()

   const { data: companiesData } = useGetAllCompaniesQuery()

   const companyOptions =
      companiesData?.companies?.map((company) => ({
         label: company.name,
         value: company.id,
      })) || []

   const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation()
   const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

   const onSubmit: SubmitHandler<createUserSchema> = async (data) => {
      try {
         // If userId prop is present then use PUT
         if (isEdit && user) {
            await updateUser({ body: { ...data, id: user.id } }).unwrap()
            router.back()
         }
         if (!isEdit) {
            await createUser({ body: data }).unwrap()
         }

         toast.success('Succesfully saved')
         reset()
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data)
      }
   }

   return (
      <FormProvider {...methods}>
         <form
            className={
               isEdit ? 'flex flex-col gap-4' : 'flex flex-col sm:grid grid-cols-4 w-full gap-4'
            }
            onSubmit={handleSubmit(onSubmit)}
         >
            <TextField name="name" label="Name" autoComplete="off" autoFocus={isEdit} />
            <TextField
               name="email"
               type="email"
               label="Email"
               autoComplete="off"
               autoFocus={isEdit}
            />
            <TextField
               name="password"
               type="password"
               label="Password"
               autoComplete="off"
               autoFocus={isEdit}
            />
            <SelectField
               label="Company"
               name="companies_id"
               options={companyOptions}
               onChange={(option) => {
                  if (option) setValue('companies_id', +option.value)
               }}
               value={
                  companyOptions.find((company) => company.value === watch('companies_id')) || null
               }
            />
            <div className="mt-6">
               <Button
                  type="submit"
                  isLoading={loadingCreate || loadingUpdate}
                  disabled={loadingCreate || loadingUpdate}
               >
                  Submit
               </Button>
            </div>
         </form>
      </FormProvider>
   )
}

export default UsersForm