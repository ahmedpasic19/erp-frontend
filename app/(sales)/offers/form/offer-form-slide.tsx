'use client'

import React, { useState } from 'react'

import OfferArticleTable from '../tables/offer-article-table'

import OfferArticleForm from './offer-article-form'
import OffersForm from './offers-form'
import Button from '@/components/root/button'
import { useGetOneOfferQuery } from '@/lib/_services/sales/offers-api'

const OfferFormSlide = () => {
   const [openForm, setOpenForm] = useState(false)
   const [offerId, setOfferId] = useState(0)
   const [changeKey, setChangeKey] = useState(false)

   const { data } = useGetOneOfferQuery({ id: offerId }, { skip: !offerId })

   const onFinish = () => {
      setOfferId(0)
      setChangeKey((prev) => !prev)
      setOpenForm(false)
   }

   return (
      <>
         <div className="w-full p-4 flex flex-col justify-start items-start">
            <div className="max-w-6xl">
               <Button onClick={() => setOpenForm((prev) => !prev)}>Add Offer</Button>
            </div>
            {openForm && (
               <div className="w-full mt-4">
                  <OffersForm
                     setOfferId={setOfferId}
                     offer={offerId ? data?.offer : undefined}
                     isEdit={offerId ? true : false}
                     changeKey={changeKey}
                  />

                  {offerId ? (
                     <>
                        <hr className="w-full mt-10 p-2" />
                        <OfferArticleForm offerId={offerId} />
                        <div className="mt-2">
                           <OfferArticleTable offerId={offerId} />
                        </div>
                        <div>
                           <Button onClick={onFinish}>Finish</Button>
                        </div>
                     </>
                  ) : null}
               </div>
            )}
         </div>
      </>
   )
}

export default OfferFormSlide
