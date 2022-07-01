import { object, string } from 'yup'

type UpdateAccountRequest = {
  id: string
  name: string
  bank: string
}

export const UpdateAccountRequestValidator = object().shape({
  id: string(),
  name: string().required('errors.validation.required'),
  bank: string().required('errors.validation.required'),
})

export default UpdateAccountRequest
