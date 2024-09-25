import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user);
  // const {  currentShop } = useSelector((state) => state.seller);
  // Determine if the user or shop is authenticated
  const isAuthenticated = currentUser ;

  return isAuthenticated ? <Outlet /> : <Navigate to={currentUser && '/sign-in' } />;
}
