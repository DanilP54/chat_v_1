import React from 'react'
import { Providers } from './providers';
import { AppRouters } from "./routers";
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import '../shared/config/firebase'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
            <AppRouters />
        </Providers>
    </React.StrictMode>,
)