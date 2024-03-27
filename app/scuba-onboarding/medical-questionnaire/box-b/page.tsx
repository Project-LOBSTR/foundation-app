'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxB = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
})

type medicalQuestionnaireSchemaBoxB = z.infer<
  typeof medicalQuestionnaireSchemaBoxB
>

const BoxB = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxB>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxB),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxB) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxC)
  }

  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h4">
          Box B
        </Heading>
        <Heading className="subtitle text-left font-semibold" size="h6">
          I am 45 years of age and:
        </Heading>
        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="1"
            rules={{ required: 'This field is required' }}
            render={({ field }) => {
              return (
                <Checkbox.Root
                  defaultChecked={false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                  }}
                >
                  <Checkbox.Indicator>
                    <Checkbox.Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )
            }}
          />
          <Text className="max-w-[300px]">
            I currently smoke or inhale nicotine by other means.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="2"
            rules={{ required: 'This field is required' }}
            render={({ field }) => {
              return (
                <Checkbox.Root
                  defaultChecked={false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                  }}
                >
                  <Checkbox.Indicator>
                    <Checkbox.Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )
            }}
          />
          <Text className="max-w-[300px]">
            I have a high cholesterol level.
          </Text>
        </div>

        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="3"
            rules={{ required: 'This field is required' }}
            render={({ field }) => {
              return (
                <Checkbox.Root
                  defaultChecked={false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                  }}
                >
                  <Checkbox.Indicator>
                    <Checkbox.Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )
            }}
          />
          <Text className="max-w-[300px]">I have high blood pressure.</Text>
        </div>
        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="4"
            rules={{ required: 'This field is required' }}
            render={({ field }) => {
              return (
                <Checkbox.Root
                  defaultChecked={false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                  }}
                >
                  <Checkbox.Indicator>
                    <Checkbox.Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )
            }}
          />
          <Text className="max-w-[300px]">
            I have had a close blood relative die suddenly or of cardiac disease
            or stroke before the age of 50, OR have a family history of heart
            disease before age 50 (including abnormal heart rhythms, coronary
            artery disease or cardiomyopathy).
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

export default BoxB
