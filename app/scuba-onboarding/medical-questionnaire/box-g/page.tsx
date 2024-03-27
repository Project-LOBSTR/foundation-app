'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
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
  const { setValue, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxG>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxG),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxG) => {
    console.log(data)
    router.push(routes.profile)
  }

  ;<Layout logoSize={200}>
    <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
      <Heading className="font-semibold text-center" size="h5">
        I have/have had:
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
          Ostomy surgery and do not have medical clearance to swim or engage in
          physical activity.
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
          Dehydration requiring medical intervention within the last 7 days.
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
          Active or untreated stomach or intestinal ulcers or ulcer surgery
          within the last 6 months.
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
          Frequent heartburn, regurgitation, or gastroesophageal reflux disease
          (GERD).
        </Text>
      </div>
      <div className="flex flex-row gap-2">
        <Checkbox.Root
          defaultChecked={false}
          onCheckedChange={(checked) => {
            if (typeof checked !== 'boolean') return false

            setValue('5', checked)
          }}
        >
          <Checkbox.Indicator>
            <Checkbox.Check />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Text className="max-w-[300px]">
          Active or uncontrolled ulcerative colitis or Crohn’s disease.
        </Text>
      </div>
      <div className="flex flex-row gap-2">
        <Checkbox.Root
          defaultChecked={false}
          onCheckedChange={(checked) => {
            if (typeof checked !== 'boolean') return false

            setValue('6', checked)
          }}
        >
          <Checkbox.Indicator>
            <Checkbox.Check />
          </Checkbox.Indicator>
        </Checkbox.Root>
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
}

export default BoxG
