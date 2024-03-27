'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxE = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
})

type medicalQuestionnaireSchemaBoxE = z.infer<
  typeof medicalQuestionnaireSchemaBoxE
>

const BoxE = () => {
  const router = useRouter()
  const { setValue, handleSubmit } = useForm<medicalQuestionnaireSchemaBoxE>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxE),
  })

  const onSubmit = (data: medicalQuestionnaireSchemaBoxE) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxF)
  }

  return (
    <Layout logoSize={200}>
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
            Behavioral health, mental or psychological problems requiring
            medical/psychiatric treatment.
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
            Major depression, suicidal ideation, panic attacks, uncontrolled
            bipolar disorder requiring medication/psychiatric treatment.
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
            Been diagnosed with a mental health condition or a
            learning/developmental disorder that requires ongoing care or
            special accommodation.
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
            An addiction to drugs or alcohol requiring treatment within the last
            5 years.
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

export default BoxE
