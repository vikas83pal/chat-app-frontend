import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PageRoutes from "./components/Configuration/pageRoutes"
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChatProvider } from './components/context/chatContext';


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <Toaster position='top-right'/>

      <ChatProvider>
      <PageRoutes />
      </ChatProvider>
      
    </BrowserRouter>

);
