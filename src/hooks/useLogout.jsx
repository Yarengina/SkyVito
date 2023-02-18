import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/store/slices/tokenSlice'

export const useLogout = () => {
  const [, , removeCookies] = useCookies(['access', 'refresh'])
  const dispatch = useDispatch()

  const logout = () => {
    removeCookies('access')
    removeCookies('refresh')
    dispatch(setToken({ access_token: undefined, refresh_token: undefined }))
  }

  return logout
}
