import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoSkypro from '../../components/Icons/LogoSkypro'
import Button from '../../components/Ui/Button'
import PageWrapper from '../../components/PageWrapper'
import { validEmail, validPasswordLength } from '../../utils/constants'
import { useLoginMutation } from '../../redux/API/authApi'
import { setToken } from '../..//redux/store/slices/tokenSlice'
import { getErrorMessage } from '../../utils/utils'
import classes from './index.module.css'
import cn from 'classnames'

const LoginPage = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [login, { data: userTokens }] = useLoginMutation()
  const [error, setError] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(['access', 'refresh'])

  useEffect(() => {
    if (userTokens) {
      setCookies('access', userTokens.access_token)
      setCookies('refresh', userTokens.refresh_token)

      dispatch(
        setToken({
          access_token: userTokens.access_token,
          refresh_token: userTokens.refresh_token,
        })
      )
    }
  }, [userTokens])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (data) => {
    setError('')

    try {
      await login({ email: data.email, password: data.password }).unwrap()
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setError(getErrorMessage(error))
    }
  }

  const handleSignUpClick = () => {
    navigate('/signUp')
  }

  return (
    <PageWrapper>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.logo}>
          <LogoSkypro />
        </div>
        <input
          className={classes.input}
          type="text"
          placeholder="Email"
          {...register('email', {
            required: true,
            pattern: {
              value: validEmail,
              message: 'Введите корректный email',
            },
          })}
        />
        {errors.email && (
          <p className={cn(classes.error, classes.emailError)}>
            {errors.email.message}
          </p>
        )}
        <input
          className={classes.input}
          type="password"
          placeholder="Пароль"
          {...register('password', {
            required: true,
            minLength: {
              value: validPasswordLength,
              message: `Пароль должен быть не менее ${validPasswordLength} символов`,
            },
          })}
        />
        {errors.password && (
          <p className={cn(classes.error, classes.passError)}>
            {errors.password.message}
          </p>
        )}
        {error && (
          <p className={cn(classes.error, classes.backendError)}>{error}</p>
        )}

        <Button type="submit" btnName="main" className={classes.btnEnter}>
          Войти
        </Button>
        <Button
          type="button"
          btnName="login"
          className={classes.btnSignup}
          onClick={handleSignUpClick}
        >
          Зарегистрироваться
        </Button>
      </form>
    </PageWrapper>
  )
}

export default LoginPage
