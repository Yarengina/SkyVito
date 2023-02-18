import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
