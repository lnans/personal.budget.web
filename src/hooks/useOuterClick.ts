import { RefObject, useEffect, useRef } from 'react'

type OutClickCallback = () => void

export function useOuterClick<TElement extends HTMLElement>(
  callback: OutClickCallback
): RefObject<TElement> {
  const callbackRef = useRef<OutClickCallback>()
  const innerRef = useRef<TElement>(null)

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
    function handleClick(e: MouseEvent) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target as Node))
        callbackRef.current()
    }
  }, []) // no dependencies -> stable click listener

  return innerRef
}
