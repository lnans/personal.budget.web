import { http } from '@api'
import { AuthInfoResponse, SignInRequest, SignInResponse } from '@models'

const AUTHENTICATION_CACHE_KEY = 'Authentication'

const getAuthInfo = () => http.Get<AuthInfoResponse>('/auth')
const signIn = (form: SignInRequest) => http.Post<SignInRequest, SignInResponse>('/auth/signin', form)

export const authRequests = {
  AUTHENTICATION_CACHE_KEY,
  getAuthInfo,
  signIn,
}
