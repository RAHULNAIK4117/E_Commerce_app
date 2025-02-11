import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {AuthLayout, HomeLayout, PageNotFound, RouteProtector} from './others'
import {Home, SignIn, SignUp} from './pages'

const route = createBrowserRouter([
  {
    path: '/',
    element: <RouteProtector><App /></RouteProtector>,
    children: [
      {
        index: true,
        element: <Home/>
      },
    ]
  },
  {
    path: "/auth",
    element: <RouteProtector><AuthLayout/></RouteProtector>,
    children: [
      {
        path:"sign-in",
        element: <SignIn />
      },
      {
        path:"sign-up",
        element: <SignUp />
      },
    ]
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
)
