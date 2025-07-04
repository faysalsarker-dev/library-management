import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/Router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
      <RouterProvider router={router} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

    </Provider>
  </StrictMode>,
)
