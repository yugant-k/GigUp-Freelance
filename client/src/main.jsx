import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Gigs from './pages/Gigs';
import MyGigs from './pages/MyGigs';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import Message from './pages/Message';
import Add from './pages/Add';
import Gig from './pages/Gig';
import Registration from './pages/Registration';
import Login from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='gigs' element={<Gigs />} />
        <Route path='myGigs' element={<MyGigs />} />
        <Route path='orders' element={<Orders />} />
        <Route path='messages' element={<Messages />} />
        <Route path='message/:id' element={<Message />} />
        <Route path='add' element={<Add />} />
        <Route path='gigs/single/:id' element={<Gig />} />
      </Route>
      <Route path='register' element={<Registration />} />
      <Route path='login' element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
