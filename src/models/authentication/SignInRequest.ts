import { object, string } from 'yup'

type SignInRequest = {
  username: string
  password: string
}

export const SignInRequestValidator = object().shape({
  username: string().required('errors.validation.required'),
  password: string().required('errors.validation.required'),
})

export default SignInRequest
