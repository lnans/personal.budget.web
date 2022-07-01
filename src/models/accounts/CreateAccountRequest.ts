import { number, object, string } from 'yup'

type CreateAccountRequest = {
  name: string
  bank: string
  icon?: string
  type: string
  initialBalance: number
}

export const CreateAccountRequestValidator = object().shape({
  name: string().required('errors.validation.required'),
  bank: string().required('errors.validation.required'),
  icon: string(),
  type: string().required('errors.validation.required'),
  initialBalance: number()
    .typeError('errors.validation.invalid_amount')
    .required('errors.validation.required'),
})

export default CreateAccountRequest
