import React from 'react'

import { AppRouters } from "./routers";
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import '../shared/config/firebase'
import { Toaster } from '@/shared/ui/toaster';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0cd6867acdd3cea863841a9f5c08d758@o4507771612561408.ingest.de.sentry.io/4507771658174544",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});



ReactDOM.createRoot(document.getElementById('root')!).render(
    <>

        <React.StrictMode>
            <AppRouters />
            <Toaster />
        </React.StrictMode>

    </>

)
