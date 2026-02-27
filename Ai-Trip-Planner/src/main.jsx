import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';

// Component Imports
import MyTrips from './my-trips/index.jsx' 
import ViewTrip from './view-trip/[tripID]/index.jsx' 
import Hero from './components/custom/Hero.jsx'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { ThemeProvider } from "./components/theme-provider" 

function Layout() {
  return (
    <>
      <Toaster position="bottom-left" richColors />
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    // This handles any route errors globally
    errorElement: <div className="p-20 text-center font-bold">404 - Page Not Found</div>,
    children: [
      { path: '/', element: <Hero /> },
      { path: '/create-trip', element: <CreateTrip /> },
      // DYNAMIC ROUTE: Ensure the colon is present and matches your useParams key
      { path: '/view-trip/:tripID', element: <ViewTrip /> }, 
      { path: '/my-trips', element: <MyTrips /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)