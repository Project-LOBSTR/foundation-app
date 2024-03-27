'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxF = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
  '5': z.boolean().default(false),
})

type medicalQuestionnaireSchemaBoxF = z.infer<
  typeof medicalQuestionnaireSchemaBoxF
>

const BoxF = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxF>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxF),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxF) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxG)
  }

  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h4">
          Box F
        </Heading>
        <Heading className="subtitle text-left font-semibold" size="h6">
          I have/I had:
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
            Recurrent back problems in the last 6 months that limit my everyday
            activity.
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
            Back or spinal surgery within the last 12 months.
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
          <Text className="max-w-[300px]">
            Diabetes, either drug or diet controlled, OR gestational diabetes
            within the last 12 months.
          </Text>
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
            An uncorrected hernia that limits my physical abilities.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="5"
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
            Active or untreated ulcers, problem wounds, or ulcer surgery within
            the last 6 months.
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

export default BoxF
