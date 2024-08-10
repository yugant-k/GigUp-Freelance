import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
  )
}

export default App
