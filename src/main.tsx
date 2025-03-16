import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const ExampleQuery = lazy(() => import('./components/ExampleQuery'))
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex justify-center items-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>}>
        <App />
        <div className="container mx-auto py-8 px-4">
          <ExampleQuery />
        </div>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
