import { ErrorHttp, ErrorResponse } from '@models'

const apiUrl = import.meta.env.VITE_API_BASE_URL
const tokenKey = import.meta.env.VITE_TOKEN_KEY

function getAuthorizedHeader(headers?: Headers): Headers {
  const token = localStorage.getItem(tokenKey)
  const authorizationHeader = new Headers(headers)
  if (token) {
    authorizationHeader.append('Authorization', `Bearer ${localStorage.getItem(tokenKey)}`)
  }
  return authorizationHeader
}

function getContentHeader<TData>(content: TData): Headers {
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

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function Request<TResult>(method: HttpMethod, path: string): Promise<TResult> {
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: getAuthorizedHeader(),
  }).then<TResult>(parseResponse)
}

async function RequestWithBody<TResult, TBody>(method: HttpMethod, path: string, body: TBody): Promise<TResult> {
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: getAuthorizedHeader(getContentHeader(body)),
    body: JSON.stringify(body),
  }).then<TResult>(parseResponse)
}

const Get = async <TResult>(path: string) => Request<TResult>('GET', path)
const Post = async <TBody, TResult>(path: string, body: TBody) => RequestWithBody<TResult, TBody>('POST', path, body)
const Patch = async <TBody, TResult>(path: string, body: TBody) => RequestWithBody<TResult, TBody>('PATCH', path, body)
const Delete = async <TResult>(path: string) => Request<TResult>('DELETE', path)

export const http = { Delete, Get, Patch, Post }
