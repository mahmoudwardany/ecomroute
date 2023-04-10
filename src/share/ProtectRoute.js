import { Navigate,useLocation } from "react-router-dom";

const ProtectRoute = ({children}) => {
const location=useLocation()
if(localStorage.getItem('userToken')===null){
  return  <Navigate to='/login' state={{path:location.pathname}}/>
}
    return children
}

export default ProtectRoute