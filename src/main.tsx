import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ApolloProviderCustom from './config/apollo-provider-custom.tsx'
import 'antd/dist/antd.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProviderCustom>
      <App />
    </ApolloProviderCustom>
  </React.StrictMode>,
)
