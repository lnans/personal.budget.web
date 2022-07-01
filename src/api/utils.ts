import { ErrorHttp, ErrorResponse } from '@models'

const apiUrl = import.meta.env.VITE_API_BASE_URL
const tokenKey = import.meta.env.VITE_TOKEN_KEY

const getAuthorizedHeader = (headers?: Headers): Headers => {
  const token = localStorage.getItem(tokenKey)
  const authorizationHeader = new Headers(headers)
  if (token) {
    authorizationHeader.append('Authorization', `Bearer ${localStorage.getItem(tokenKey)}`)
  }
  return authorizationHeader
}

const getContentHeader = <TData>(content: TData): Headers => {
  const body = JSON.stringify(content)
  const contentHeader = new Headers()
  contentHeader.append('Content-Type', 'application/json')
  contentHeader.append('Content-Length', body.length.toString())
  return contentHeader
}

async function parseResponse<TResult>(response: Response): Promise<TResult> {
  const res = response.clone()

  if (response.ok) {
    const responseAsText = await res.text()
    if (responseAsText.length) {
      const result = JSON.parse(responseAsText) as TResult
      return Promise.resolve(result)
    }
    return Promise.resolve({} as TResult)
  }

  const httpError = { status: res.status, body: await res.text() } as ErrorHttp

  if (httpError && httpError.body.length) {
    return Promise.reject(JSON.parse(httpError.body) as ErrorResponse)
  }

  return Promise.reject(httpError)
}

const Get = <TResult>(path: string) =>
  fetch(`${apiUrl}${path}`, { headers: getAuthorizedHeader() }).then<TResult>(parseResponse)

const Post = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: getAuthorizedHeader(getContentHeader(body)),
    body: JSON.stringify(body),
  }).then<TResult>(parseResponse)

const Patch = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, {
    method: 'PATCH',
    headers: getAuthorizedHeader(getContentHeader(body)),
    body: JSON.stringify(body),
  }).then<TResult>(parseResponse)

const Put = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, {
    method: 'PUT',
    headers: getAuthorizedHeader(getContentHeader(body)),
    body: JSON.stringify(body),
  }).then<TResult>(parseResponse)

const Delete = <TResult>(path: string) =>
  fetch(`${apiUrl}${path}`, { method: 'DELETE', headers: getAuthorizedHeader() }).then<TResult>(
    parseResponse
  )

export { Delete, Get, Patch, Post, Put }
