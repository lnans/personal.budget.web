import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App.tsx'
import { Toaster } from './components/ui/Sonner.tsx'
import './index.css'
import { i18next } from './lib/I18next.ts'
import QueryProvider from './providers/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <I18nextProvider i18n={i18next}>
        <App />
        <Toaster />
      </I18nextProvider>
    </QueryProvider>
  </StrictMode>
)
