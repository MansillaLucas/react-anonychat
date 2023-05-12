import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChatContextProvider } from './ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatContextProvider><App /></ChatContextProvider>
  </React.StrictMode>
);
