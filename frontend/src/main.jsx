import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./state/store.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="bottom-right"
          style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#F9FAFB',
          }}
        />

        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
