'use client'

import { createContext } from 'react'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface IFormBuilderProvider {
  register?: UseFormRegister<FieldValues>
  handleSubmit?: UseFormHandleSubmit<FieldValues>
  errors?: FieldErrorsImpl<{
    [x: string]: any
  }>
}

export const FormBuilderContext = createContext<IFormBuilderProvider>({})

export default function FormBuilderProvider({ children }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <FormBuilderContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  )
}
