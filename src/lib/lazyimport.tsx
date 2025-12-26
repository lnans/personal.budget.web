import React, { Suspense } from 'react'

export function lazyImport<T extends React.ComponentType<any>, I extends Record<K, T>, K extends keyof I>(
  factory: () => Promise<I>,
  name: K,
  loader: React.ReactNode
): I {
  const LazyComponent = React.lazy(() => factory().then((module) => ({ default: module[name] })))

  return Object.create({
    [name]: (props: any) => (
      <Suspense fallback={loader}>
        <LazyComponent {...props} />
      </Suspense>
    ),
  })
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
