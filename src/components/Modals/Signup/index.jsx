import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../../redux/API/authApi'
import { setToken } from '../../..//redux/store/slices/tokenSlice'
import LogoSkypro from '../../Icons/LogoSkypro'
import Button from '../../Ui/Button'
import { validEmail, validPasswordLength } from '../../../utils/constants'
import { getErrorMessage } from '../../../utils/utils'
import classes from './index.module.css'
import cn from 'classnames'

const Signup = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [signUp] = useRegisterMutation()
  const [login, { data: userTokens }] = useLoginMutation()

  const [, setCookies] = useCookies(['access', 'refresh'])

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
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (data) => {
    setError('')

    try {
      const user = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname,
        city: data.city,
      }).unwrap()
      if (user)
        await login({ email: data.email, password: data.password }).unwrap()
      navigate('/profile')
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  return (
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
      <input
        className={classes.input}
        type="password"
        placeholder="Повторите пароль"
        {...register('confirmPassword', {
          required: true,
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues()
              return password === value || `Пароли не совпадают`
            },
          },
        })}
      />
      {errors.confirmPassword && (
        <p className={cn(classes.error, classes.confirmPassError)}>
          {errors.confirmPassword.message}
        </p>
      )}
      <input
        className={classes.input}
        type="text"
        placeholder="Имя (необязательно)"
        {...register('name')}
      />
      <input
        className={classes.input}
        type="text"
        placeholder="Фамилия (необязательно)"
        {...register('surname')}
      />
      <input
        className={classes.input}
        type="text"
        placeholder="Город (необязательно)"
        {...register('city')}
      />
      {error && (
        <p className={cn(classes.error, classes.backendError)}>{error}</p>
      )}
      <Button type="submit" btnName="main" className={classes.button}>
        Зарегистрироваться
      </Button>
    </form>
  )
}

export default Signup


