import React, { Suspense } from 'react'

import { Spinner } from '@/components/ui/Spinner'

export function lazyImport<T extends React.ComponentType<any>, I extends Record<K, T>, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  const LazyComponent = React.lazy(() => factory().then((module) => ({ default: module[name] })))

  return Object.create({
    [name]: (props: any) => (
      <Suspense fallback={<Spinner />}>
        <LazyComponent {...props} />
      </Suspense>
    ),
  })
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
