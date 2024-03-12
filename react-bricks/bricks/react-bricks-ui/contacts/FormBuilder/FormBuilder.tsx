import { Repeater, types } from 'react-bricks/rsc'

import classNames from 'classnames'
import blockNames from '../../blockNames'
import { buttonColors } from '../../colors'
import {
  backgroundSideGroup,
  LayoutProps,
  paddingBordersSideGroup,
  sectionDefaults,
} from '../../LayoutSideProps'
import FormBuilderClient from './FormBuilderClient'
import FormBuilderProvider from './FormBuilderProvider'

export interface FormBuilderProps extends LayoutProps {
  buttonPosition: string
  formElements: types.RepeaterItems
  formButtons: types.RepeaterItems
}

const FormBuilder: types.Brick<FormBuilderProps> = ({
  backgroundColor,
  backgroundImage,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  buttonPosition,
  formElements,
  formButtons,
  width,
}) => {
  return (
    <FormBuilderProvider>
      <FormBuilderClient
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        borderTop={borderTop}
        borderBottom={borderBottom}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        buttonPosition={buttonPosition}
        formElements={formElements}
        formButtons={formButtons}
        width={width}
      >
        <Repeater
          propName="formElements"
          items={formElements}
          // itemProps={{ register, errors }}
        />
        <Repeater
          propName="formButtons"
          items={formButtons}
          renderWrapper={(items) => (
            <div
              className={classNames(
                'w-full flex space-x-6 col-span-2',
                buttonPosition
              )}
            >
              {items}
            </div>
          )}
        />
      </FormBuilderClient>
    </FormBuilderProvider>
  )
}

FormBuilder.schema = {
  name: blockNames.FormBuilder,
  label: 'Form',
  category: 'contact',
  previewImageUrl: `/bricks-preview-images/${blockNames.FormBuilder}.png`,
  repeaterItems: [
    {
      name: 'formElements',
      positionLabel: 'Form elements',
      items: [
        { type: blockNames.FormInput },
        { type: blockNames.FormTextArea },
        { type: blockNames.FormCheckbox },
        { type: blockNames.FormSelect },
        { type: blockNames.FormRadiobuttons },
      ],
    },
    {
      name: 'formButtons',
      itemLabel: 'Button',
      itemType: blockNames.Button,
      min: 0,
      max: 2,
    },
  ],

  sideEditProps: [
    {
      groupName: 'Buttons',
      defaultOpen: true,
      props: [
        {
          name: 'buttonPosition',
          label: 'Buttons position',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Select,
            options: [
              { value: 'justify-start', label: 'Left' },
              { value: 'justify-center', label: 'Center' },
              { value: 'justify-end', label: 'Right' },
            ],
          },
        },
      ],
    },
    backgroundSideGroup,
    paddingBordersSideGroup,
  ],

  getDefaultProps: () => ({
    ...sectionDefaults,
    buttonPosition: 'justify-center',
    formElements: [
      {
        type: blockNames.FormInput,
        props: {
          fieldName: 'firstname',
          isRequired: false,
          inputType: 'text',
          columns: '1',
          label: 'First Name',
          requiredError: '',
          pattern: '',
          patternError: '',
        },
      },
      {
        type: blockNames.FormInput,
        props: {
          fieldName: 'lastname',
          isRequired: false,
          inputType: 'text',
          columns: '1',
          label: 'Last Name',
          requiredError: '',
          pattern: '',
          patternError: '',
        },
      },
      {
        type: blockNames.FormInput,
        props: {
          fieldName: 'email',
          isRequired: true,
          inputType: 'email',
          columns: '2',
          label: 'Email',
          requiredError: 'Email is required',
          pattern: '',
          patternError: '',
        },
      },
      {
        type: blockNames.FormTextArea,
        props: {
          fieldName: 'message',
          isRequired: false,
          columns: '2',
          label: 'Message',
          requiredError: '',
          pattern: '',
          patternError: '',
        },
      },
      {
        type: blockNames.FormCheckbox,
        props: {
          fieldName: 'privacy',
          isRequired: true,
          columns: '2',
          label: 'I accept the processing of my data',
          requiredError: 'Please, accept our privacy terms',
          pattern: '',
          patternError: '',
        },
      },
    ],
    formButtons: [
      {
        type: 'button',
        buttonType: 'submit',
        buttonColor: buttonColors.SKY.value,
        text: 'Send',
        variant: 'solid',
      },
    ],
  }),
}

export default FormBuilder
