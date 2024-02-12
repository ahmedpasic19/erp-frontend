'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
   useCreateArticleMutation,
   useUpdateArticleMutation,
} from '@/app/_services/basic/articles-api'
import { useGetAllCompaniesQuery } from '@/app/_services/basic/companies-api'
import Button from '@/components/root/button'
import SelectField from '@/components/root/select-field'
import TextField from '@/components/root/text-filed'
import { Article } from '@/schemas/basic/articles/articles.interface'
import { createArticleSchema, updateArticleSchema } from '@/schemas/basic/articles/articles.schema'

type TProps = {
   isEdit?: boolean
   article?: Article
}

const ArticlesForm = ({ isEdit, article }: TProps) => {
   const methods = useForm<createArticleSchema>({
      resolver: zodResolver(isEdit ? updateArticleSchema : createArticleSchema),
      values: isEdit && article ? article : ({} as Article),
   })

   const { handleSubmit, reset, setValue, watch } = methods

   const router = useRouter()

   const { data: companiesData } = useGetAllCompaniesQuery()

   const companyOptions =
      companiesData?.companies?.map((company) => ({
         label: company.name,
         value: company.id,
      })) || []

   const [createArticle, { isLoading: loadingCreate }] = useCreateArticleMutation()
   const [updateArticle, { isLoading: loadingUpdate }] = useUpdateArticleMutation()

   const onSubmit: SubmitHandler<createArticleSchema> = async (data) => {
      try {
         // If articleId prop is present then use PUT
         if (isEdit && article) {
            await updateArticle({ body: { ...data, id: article.id } }).unwrap()
            router.back()
         }
         if (!isEdit) {
            await createArticle({ body: data }).unwrap()
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
               name="code"
               type="number"
               label="Code"
               autoComplete="off"
               autoFocus={isEdit}
            />
            <TextField
               name="price_without_vat"
               type="number"
               label="Price without VAT"
               autoComplete="off"
               autoFocus={isEdit}
            />
            <TextField
               name="price_with_vat"
               type="number"
               label="Price with VAT"
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

export default ArticlesForm
