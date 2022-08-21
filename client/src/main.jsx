import React from 'react';
import ReactDOM from 'react-dom/client';

import TransactionProvider from './context/TransactionsContext';
import App from './App';
import './index.css';

window.process = import.meta;

ReactDOM.createRoot(document.getElementById('root')).render(
   <TransactionProvider>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </TransactionProvider>
);
