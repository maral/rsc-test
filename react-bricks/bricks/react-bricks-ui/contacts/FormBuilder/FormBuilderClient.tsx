'use client'

import { useContext } from 'react'
import { types } from 'react-bricks/rsc'

import { LayoutProps } from '../../LayoutSideProps'
import Container from '../../shared/components/Container'
import Section from '../../shared/components/Section'
import { FormBuilderContext } from './FormBuilderProvider'

export interface FormBuilderClientProps extends LayoutProps {
  buttonPosition: string
  formElements: types.RepeaterItems
  formButtons: types.RepeaterItems
  children: any
}

const FormBuilderClient: React.FC<FormBuilderClientProps> = ({
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  children,
}) => {
  const { register, handleSubmit } = useContext(FormBuilderContext)

  if (!register || !handleSubmit) {
    return null
  }

  const onSubmit = () => {
    console.log('submit')
  }

  return (
    <div>
      <Section
        backgroundColor={backgroundColor}
        borderTop={borderTop}
        borderBottom={borderBottom}
      >
        <Container
          size="full"
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 py-6"
          >
            {children}
          </form>
        </Container>
      </Section>
    </div>
  )
}

export default FormBuilderClient
