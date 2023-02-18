import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import HomeIcon from '../Icons/HomeIcon'
import PlusIcon from '../Icons/PlusIcon'
import ProfileIcon from '../Icons/ProfileIcon'
import { accessTokenSelector } from '../../redux/store/selectors/tokens'
import classes from './index.module.css'

const Footer = () => {
  const [cookies] = useCookies(['access', 'refresh'])
  const access_token = useSelector(accessTokenSelector)
  const isLoggedIn = cookies && cookies.access && access_token ? true : false

  return (
    <div className={classes.footer}>
      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to={isLoggedIn && '/createAd'}>
        <PlusIcon />
      </Link>
      <Link to={isLoggedIn ? '/profile' : '/login'}>
        <ProfileIcon />
      </Link>
    </div>
  )
}

export default Footer
