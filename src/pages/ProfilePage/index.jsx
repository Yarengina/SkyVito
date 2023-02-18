import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utils/constants'
import PageWrapper from '../../components/PageWrapper'
import LogoBackBlock from '../../components/LogoBackBlock'
import Ads from '../../components/Ads'
import Button from '../../components/Ui/Button'
import UserSettings from '../../components/UserSettings'
import { useGetUserQuery } from '../../redux/API/usersApi'
import { useLogout } from '../../hooks/useLogout'
import classes from './index.module.css'

const ProfilePage = () => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })

  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const timestamp = useRef(Date.now()).current

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserQuery(timestamp, {
    refetchOnMountOrArgChange: true,
  })

  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name)
    }
  }, [user])

  const logout = useLogout()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <PageWrapper>
      {isDesktop && <LogoBackBlock />}
      {error && <p className={classes.error}>Извините, произошла ошибка! </p>}
      {isLoading && <p>Загрузка...</p>}
      {!!user && (
        <>
          {isMobile && (
            <div className={classes.wrapper}>
              <h2 className={classes.title}>
                Здравствуйте{userName ? `, ${userName}` : ''}!
              </h2>
              <Button
                type="button"
                btnName="main"
                className={classes.btnLogout}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          )}
          {isDesktop && (
            <h2 className={classes.title}>
              Здравствуйте{userName ? `, ${userName}` : ''}!
            </h2>
          )}
          <h3 className={classes.subtitle}>Настройки профиля</h3>
          <UserSettings
            user={user}
            setUserName={setUserName}
            userName={userName}
          />
          <h3 className={classes.subtitle}>Мои товары</h3>
          <Ads sellerId={user.id} isProfilePage={true} />
        </>
      )}
    </PageWrapper>
  )
}

export default ProfilePage
