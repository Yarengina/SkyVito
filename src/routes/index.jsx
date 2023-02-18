import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import ProfilePage from '../pages/ProfilePage'
import AdsPage from '../pages/AdsPage'
import SellerPage from '../pages/SellerPage'
import CreateAdPage from '../pages/CreateAdPage'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import CommentPage from '../pages/CommentPage'
import SettingsPage from '../pages/SettingsPage'
import useLoadCredentials from '../hooks/useLoadCredentials'

const AppRoutes = () => {
  const isLoggedIn = useLoadCredentials()

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ads/:id" element={<AdsPage />} />
        <Route path="/seller/:id" element={<SellerPage />} />
        <Route path="/createAd" element={<CreateAdPage />} />
        <Route path="/comments/:id" element={<CommentPage />} />
        <Route path="/settings/:id" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
