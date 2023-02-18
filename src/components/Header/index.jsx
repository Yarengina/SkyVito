import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Button from '../Ui/Button'
import Modal from '../Modals'
import Login from '../Modals/Login'
import AddAd from '../Modals/AddAd'
import logoMobile from './logo-mob.png'
import { useLogout } from '../../hooks/useLogout'
import { SCREEN_SIZE } from '../../utils/constants'
import SearchBlock from '../SearchBlock'
import classes from './index.module.css'

const Header = ({ isLoggedIn, searchBlock = false }) => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const [isLoginVisible, setLoginVisible] = useState(false)
  const [isAddAdVisible, setAddAdVisible] = useState(false)

  const openCloseLogin = () => {
    setLoginVisible(!isLoginVisible)
  }

  const openCloseAddAd = () => {
    setAddAdVisible(!isAddAdVisible)
  }

  const logout = useLogout()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <div className={classes.wrapper}>
        {isDesktop && (
          <nav className={classes.nav}>
            {!isLoggedIn && (
              <Button type="button" btnName="header" onClick={openCloseLogin}>
                Вход в личный кабинет
              </Button>
            )}
            {isLoggedIn && (
              <>
                <Button
                  type="button"
                  btnName="header"
                  className={classes.btnOne}
                  onClick={openCloseAddAd}
                >
                  Разместить объявление
                </Button>
                <Link to="/profile">
                  <Button
                    type="button"
                    btnName="header"
                    className={classes.btnTwo}
                  >
                    Личный кабинет
                  </Button>
                </Link>
                <Button
                  type="button"
                  btnName="header"
                  className={classes.btnThree}
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </>
            )}
          </nav>
        )}
        {isMobile && (
          <div className={classes.headerMobile}>
          <Link to="/">
            <img className={classes.logoMobile} src={logoMobile} alt="logo" />
          </Link>
          {searchBlock && <SearchBlock />}
          </div>
        )}
      </div>
      {isLoginVisible && (
        <Modal onClick={openCloseLogin}>
          <Login />
        </Modal>
      )}
      {isAddAdVisible && (
        <Modal onClick={openCloseAddAd}>
          <AddAd />
        </Modal>
      )}
    </>
  )
}

export default Header
