import { Navigate} from "react-router-dom";

const ProtectRoute = ({children}) => {
if(localStorage.getItem('userToken')===null){
  return  <Navigate to='/login' />
}
    return children
}

export default ProtectRoute