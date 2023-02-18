import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { API_URL, NO_IMAGE } from '../../utils/constants'
import { titleCase, convertDate } from '../../utils/utils'
import { accessTokenSelector } from '../../redux/store/selectors/tokens'
import classes from './index.module.css'

const AdsItem = ({ item }) => {
  const image = item.images[0] ? API_URL + item.images[0].url : NO_IMAGE
  const path = '/ads/' + item.id

  const [cookies] = useCookies(['access', 'refresh'])
  const access_token = useSelector(accessTokenSelector)
  const isLoggedIn = cookies && cookies.access && access_token ? true : false

  return (
    <Link to={isLoggedIn && path}>
      <div className={classes.card}>
        <div className={classes.image}>
          <img src={image} />
        </div>
        <div className={classes.info}>
          <h3 className={classes.title}>{titleCase(item.title)}</h3>
          <p className={classes.price}>{item.price.toLocaleString()}&nbsp;₽</p>
          <p className={classes.place}>{item.user?.city}</p>
          <p className={classes.date}>{convertDate(item.created_on || '')}</p>
        </div>
      </div>
    </Link>
  )
}

export default AdsItem
