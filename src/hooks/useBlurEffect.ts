import { useEffect } from 'react'
export const useBlurEffect = (element: HTMLElement | null, deps: (boolean | undefined)[]) => {
  useEffect(() => {
    if (deps.includes(true) && element) {
      element.blur()
    }
  }, deps)
}
