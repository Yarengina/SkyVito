import { useNavigate } from 'react-router-dom'
import Logo from '../Ui/Logo'
import Button from '../Ui/Button'
import classes from './index.module.css'

const LogoBackBar = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.container}>
      <Logo />
      <Button
        type="submit"
        btnName="main"
        className={classes.button}
        onClick={handleBack}
      >
        Вернуться назад
      </Button>
    </div>
  )
}

export default LogoBackBar
