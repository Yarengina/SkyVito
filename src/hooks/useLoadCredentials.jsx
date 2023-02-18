import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/store/slices/tokenSlice'

const useLoadCredentials = () => {
  const [cookies] = useCookies(['access', 'refresh'])
  const dispatch = useDispatch()

  if (cookies && cookies.access) {
    dispatch(
      setToken({ access_token: cookies.access, refresh_token: cookies.refresh })
    )
    return true
  }
  return false
}

export default useLoadCredentials
