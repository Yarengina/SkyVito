import { API_URL, NO_AVATAR } from '../../utils/constants'
import classes from './index.module.css'

const Avatar = ({ user, updateAvatar }) => {
  if (user && updateAvatar) {
    return (
      <img
        className={classes.img}
        width="100%"
        height="100%"
        src={updateAvatar}
        alt={user.name}
      />
    )
  }
  if (!user && !user.avatar) {
    return (
      <span>
        Аватар
        <br /> не загружен
      </span>
    )
  }
  if (!updateAvatar) {
    return (
      <img
        className={classes.img}
        width="100%"
        height="100%"
        src={user.avatar ? API_URL + user.avatar : NO_AVATAR}
        alt={user.name}
      />
    )
  }
}

export default Avatar
