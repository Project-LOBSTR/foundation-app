'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxG = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
  '5': z.boolean().default(false),
  '6': z.boolean().default(false),
})

type medicalQuestionnaireSchemaBoxG = z.infer<
  typeof medicalQuestionnaireSchemaBoxG
>

const BoxG = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxG>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxG),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxG) => {
    console.log(data)
    router.push(routes.profile)
  }

  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h4">
          Box G
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
            Ostomy surgery and do not have medical clearance to swim or engage
            in physical activity.
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
            Dehydration requiring medical intervention within the last 7 days.
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
            Active or untreated stomach or intestinal ulcers or ulcer surgery
            within the last 6 months.
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
            Frequent heartburn, regurgitation, or gastroesophageal reflux
            disease (GERD).
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
            Active or uncontrolled ulcerative colitis or Crohn’s disease.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Controller
            control={control}
            name="6"
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
            Bariatric surgery within the last 12 months.
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

export default BoxG
