import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {AuthLayout, HomeLayout, PageNotFound, RouteProtector} from './others'
import {Cart, Home, MyAccount, Orders, Product, Search, SignIn, SignUp, WishList} from './pages'

const route = createBrowserRouter([
  {
    path: '/',
    element: <RouteProtector><App /></RouteProtector>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "product",
        element: <Product/>
      },
      {
        path: "account",
        element: <MyAccount/>
      },
      {
        path: "orders",
        element: <Orders/>
      },
      {
        path: "wish-list",
        element: <WishList/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "search",
        element: <Search/>
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
