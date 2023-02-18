import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies';


const ProtectRoute = ({ element }) => {

  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
  const accessToken = getCookie('accessToken');
  
  return accessToken || userInfo ? element : <Navigate to='/login' replace={true}/>
}


export default ProtectRoute
