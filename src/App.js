import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { CartContextProvider } from './share/CartContext';
import Checkout from './components/Checkout/Checkout';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import ResetPassword from './components/forgetPassword/ResetPassword';
import ProtectRoute from './share/ProtectRoute';

function App() {

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUser()

    }
  }, [])
  const [userData, setuserData] = useState(null)
  function saveUser() {
    let token = localStorage.getItem('userToken')
    let encodeUser = jwtDecode(token)
    setuserData(encodeUser)
  }


  let routes = createHashRouter([
    {
      path: "", element: <Layout userData={userData} setuserData={setuserData} />, children: [
        { path: 'register', element:!userData? <Register /> :<Home/> },
        { path: "login", element:!userData? <Login saveUser={saveUser} /> :<Home/>},
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        {index:true, element: <ProtectRoute><Home /></ProtectRoute> },
        { path: 'productDetails/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
        { path: 'checkout/:cartId', element: <ProtectRoute><Checkout /></ProtectRoute> },
        { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> }
      ]
    }
  ])

  return (
    <CartContextProvider >
      <RouterProvider router={routes} />
    </CartContextProvider>

  );
}

export default App;