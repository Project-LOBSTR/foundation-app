'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxC = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
})

type medicalQuestionnaireSchemaBoxC = z.infer<
  typeof medicalQuestionnaireSchemaBoxC
>

const BoxC = () => {
  const router = useRouter()
  const { setValue, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxC>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxC),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxC) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxD)
  }

  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h5">
          I have/had have:
        </Heading>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('1', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            Sinus surgery within the last 6 months.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('2', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            Ear disease or ear surgery, hearing loss, or problems with balance.
          </Text>
        </div>

        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('3', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            Recurrent sinusitis within the past 12 months.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('4', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            Eye surgery within the past 3 months.
          </Text>
        </div>
        <Button.Root
          onClick={handleSubmit(onSubmit)}
          className="w-full justify-center"
        >
          Continue
        </Button.Root>
      </div>
    </Layout>
  )
}

export default BoxC
