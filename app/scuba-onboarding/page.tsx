'use client'
import { Button } from '@lobstr/react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const ScubaOnboarding = () => {
  const router = useRouter()
  return (
    <Layout logoSize={200}>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <Button.Root
          onClick={() =>
            router.push(routes.scubaOnboardingMedicalQuestionnaire)
          }
          className="w-full justify-center"
        >
          Medical Questionnaire
        </Button.Root>
      </div>
    </Layout>
  )
}

export default ScubaOnboarding
