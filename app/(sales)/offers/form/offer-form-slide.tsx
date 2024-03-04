'use client'

import React, { useState } from 'react'

import OfferArticleTable from '../tables/offer-article-table'

import OfferArticleForm from './offer-article-form'
import OffersForm from './offers-form'
import Button from '@/components/root/button'
import { useGetOneOfferQuery } from '@/lib/_services/sales/offers-api'

const OfferFormSlide = () => {
   const [offerId, setOfferId] = useState(0)

   const { data } = useGetOneOfferQuery({ id: offerId }, { skip: !offerId })

   return (
      <div className="w-full bg-white dark:bg-my-gray-100 shadow-2xl p-4">
         <OffersForm setOfferId={setOfferId} offerId={offerId} offer={data?.offer} />
         <hr className="w-full mt-10 p-2" />
         {offerId ? (
            <>
               {' '}
               <OfferArticleForm offerId={offerId} />
               <div className="mt-2">
                  <OfferArticleTable offerId={offerId} />
               </div>
               <div>
                  <Button onClick={() => setOfferId(0)}>Finish</Button>
               </div>
            </>
         ) : null}
      </div>
   )
}

export default OfferFormSlide
