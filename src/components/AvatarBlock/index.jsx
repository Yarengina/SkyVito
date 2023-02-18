import { useState } from 'react'
import Avatar from '../Avatar'
import classes from './index.module.css'

const AvatarBlock = ({
  user,
  formData,
  avatarError,
  loading,
  setIsBlocked,
}) => {
  const [updateAvatar, setUpdateAvatar] = useState()

  const handleUpdateAvatar = async (e) => {
    const files = e.target.files
    const file = files ? files[0] : null

    if (!file) {
      return
    }

    formData[0] = new FormData()
    formData[0].append('file', file)

    if (files && file) {
      setUpdateAvatar(URL.createObjectURL(file))
      setIsBlocked(false)
    }
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.avatar}>
        {loading && <span>Загрузка...</span>}
        {avatarError && (
          <span>
            Ошибка
            <br /> загрузки
          </span>
        )}
        {!updateAvatar && <Avatar user={user} />}
        {updateAvatar && <Avatar user={user} updateAvatar={updateAvatar} />}
      </div>
      <label className={classes.changeAvatar}>
        Заменить
        <input
          className={classes.input}
          type="file"
          accept="image/*"
          onChange={handleUpdateAvatar}
        />
      </label>
    </div>
  )
}

export default AvatarBlock
