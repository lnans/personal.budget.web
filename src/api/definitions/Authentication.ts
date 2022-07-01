import { AuthInfoResponse, SignInRequest, SignInResponse } from '@models'

import { Get, Post } from '../utils'

const AUTHENTICATION_CACHE_KEY = 'Authentication'

const getAuthInfo = () => Get<AuthInfoResponse>('/auth')
const signIn = (form: SignInRequest) => Post<SignInRequest, SignInResponse>('/auth/signin', form)

export const authRequests = {
  AUTHENTICATION_CACHE_KEY,
  getAuthInfo,
  signIn,
}
