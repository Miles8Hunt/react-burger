import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import { FC } from 'react';
import { useSelector } from '../../services/types/types';
import { IProtectRoute } from '../../services/types/types';


const ProtectRoute: FC<IProtectRoute> = ({ element, anonymous = false }) => {

  const location = useLocation();
  const from = location.state?.from || '/';
  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
  const accessToken = getCookie('accessToken');

  if (anonymous && userInfo) {
    return <Navigate to={ from } />;
  }

  if (!anonymous && !userInfo) {
    return accessToken || userInfo ? element : <Navigate to="/login" state={{ from: location}}/>;
  }

  return element;
}


export default ProtectRoute;
