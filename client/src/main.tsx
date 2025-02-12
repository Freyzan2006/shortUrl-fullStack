// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/api/TanstackProvider.ts'




createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client = { queryClient }>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </QueryClientProvider>

)
