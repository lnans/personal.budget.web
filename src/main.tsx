import 'remixicon/fonts/remixicon.css'
import './main.scss'
import '@i18n'

import { ToastProvider } from '@components'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ToastProvider>
  </React.StrictMode>
)
