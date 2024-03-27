'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'

const medicalQuestionnaireSchema = z.object({
  '1': z.boolean().default(false),
  '2': z.boolean().default(false),
  '3': z.boolean().default(false),
  '4': z.boolean().default(false),
  '5': z.boolean().default(false),
  '6': z.boolean().default(false),
  '7': z.boolean().default(false),
  '8': z.boolean().default(false),
  '9': z.boolean().default(false),
  '10': z.boolean().default(false),
})

type MedicalQuestionnaireSchema = z.infer<typeof medicalQuestionnaireSchema>

const MedicalQuestionnaire = () => {
  const router = useRouter()
  const { setValue, control, handleSubmit } =
    useForm<MedicalQuestionnaireSchema>({
      resolver: zodResolver(medicalQuestionnaireSchema),
    })

  const onSubmit = (data: MedicalQuestionnaireSchema) => {
    console.log(data)
    router.push(routes.scubaOnboardingMedicalQuestionnaireBoxA)
  }

  return (
    <Layout logoSize={200}>
      <div className="item-center flex overflow-y-scroll py-10 flex-col gap-8 align-middle w-full px-10">
        <Heading className="font-semibold text-center" size="h5">
          Medical Questionnaire
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
          {/* <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('1', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root> */}
          <Text className="max-w-[300px]">
            I have had problems with my lungs, breathing, heart and/or blood
            affecting my normal physical or mental performance
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
          <Text className="max-w-[300px]">I am over 45 years of age.</Text>
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
            I struggle to perform moderate exercise (for example, walk 1.6
            kilometer/one mile in 14 minutes or swim 200 meters/yards without
            resting), OR I have been unable to participate in a normal physical
            activity due to fitness or health reasons within the past 12 months.
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
            I have had problems with my eyes, ears, or nasal passages/sinuses
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
            I have had surgery within the last 12 months, OR I have ongoing
            problems related to past surgery.
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
            I have lost consciousness, had migraine headaches, seizures, stroke,
            significant head injury, or suffer from persistent neurologic injury
            or disease.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('7', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            I am currently undergoing treatment (or have required treatment
            within the last five years) for psychological problems, personality
            disorder, panic attacks, or an addiction to drugs or alcohol; or, I
            have been diagnosed with a learning or developmental disability.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('8', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            I have had back problems, hernia, ulcers, or diabetes.
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('9', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            I have had stomach or intestine problems, including recent diarrhea
          </Text>
        </div>
        <div className="flex flex-row gap-2">
          <Checkbox.Root
            defaultChecked={false}
            onCheckedChange={(checked) => {
              if (typeof checked !== 'boolean') return false

              setValue('10', checked)
            }}
          >
            <Checkbox.Indicator>
              <Checkbox.Check />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Text className="max-w-[300px]">
            I am taking prescription medications (with the exception of birth
            control or anti-malarial drugs other than mefloquine (Lariam)).
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

export default MedicalQuestionnaire
