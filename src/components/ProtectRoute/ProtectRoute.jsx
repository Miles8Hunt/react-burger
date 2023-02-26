import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


export default function ProtectRoute({ element, anonymous = false }) {

  const location = useLocation();
  const from = location.state?.from || '/';
  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);

  if (anonymous && userInfo) {
    return <Navigate to={ from } />;
  }

  if (!anonymous && !userInfo) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  return element;
}
