'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchemaBoxA = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
  '5': z.boolean().default(false),
})

type MedicalQuestionnaireSchemaBoxA = z.infer<
  typeof medicalQuestionnaireSchemaBoxA
>

const BoxA = () => {
  const router = useRouter()
  const { setValue, handleSubmit } = useForm<MedicalQuestionnaireSchemaBoxA>({
    resolver: zodResolver(medicalQuestionnaireSchemaBoxA),
  })

  const onSubmit = (data: MedicalQuestionnaireSchemaBoxA) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxB)
  }
  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h5">
          I have/had:
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
            Chest surgery, heart surgery, heart valve surgery, an implantable
            medical device (eg, stent, pacemaker, neurostimulator),
            pneumothorax,and/or chronic lung disease.
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
            Asthma, wheezing, severe allergies, hay fever or congested airways
            within the last 12 months that limits my physical activity/exercise.
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
            A problem or illness involving my heart such as: angina, chest pain
            on exertion, heart failure, immersion pulmonary oedema, heart attack
            or stroke, OR am taking medication for any heart condition.
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
            Recurrent bronchitis and currently coughing within the past 12
            months, OR have been diagnosed with emphysema.
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
            Symptoms affecting my lungs, breathing, heart and/or blood in the
            last 30 days that impair my physical or mental performance.
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

export default BoxA
