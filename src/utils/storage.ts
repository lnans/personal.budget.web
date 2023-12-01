const storagePrefix = 'budget_react_'

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string),
  setToken: (token: string) => window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem(`${storagePrefix}token`),
}
