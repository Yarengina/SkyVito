import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AvatarBlock from '../AvatarBlock'
import Button from '../Ui/Button'
import {
  useUpdateUserDetailsMutation,
  useUpdateUserAvatarMutation,
} from '../../redux/API/usersApi'
import { regexp } from '../../utils/constants'
import classes from './index.module.css'
import cn from 'classnames'

let formData = []

const UserSettings = ({ user, userName, setUserName }) => {
  const initialValue = {
    name: user.name,
    surname: user.surname,
    city: user.city,
    phone: user.phone,
  }

  const [isBlocked, setIsBlocked] = useState(true)
  const [buttonText, setButtonText] = useState('Сохранить')
  const [error, setError] = useState('')
  const [fieldValue, setFieldValue] = useState(initialValue)
  const [phone, setPhone] = useState(user.phone || '')
  const [loading, setLoading] = useState(false)

  const [updateUserDetails] = useUpdateUserDetailsMutation()
  const [updateUserAvatar, { error: avatarError }] =
    useUpdateUserAvatarMutation()

  useEffect(() => {
    setIsBlocked(isBlocked)
    if (!isBlocked) {
      setButtonText('Сохранить')
    }
  }, [isBlocked])

  const handleFieldChange = (e, field) => {
    setIsBlocked(false)
    setButtonText('Сохранить')
    setFieldValue((prev) => ({ ...prev, [field]: e.target.value }))

    if (field === 'name') {
      setUserName(e.target.value)
    }
  }

  const handleChangePhone = (e) => {
    setIsBlocked(false)
    setButtonText('Сохранить')

    const inputPhoneValue = e.target.value

    if (regexp.test(inputPhoneValue)) {
      e.target.value = inputPhoneValue.replace(regexp, '')
    }

    setPhone(e.target.value)
  }

  const { register, handleSubmit } = useForm({ mode: 'onBlur' })

  const onSubmit = async (data) => {
    setIsBlocked(true)

    try {
      await updateUserDetails({
        name: userName,
        surname: data.surname,
        city: data.city,
        phone: data.phone,
      }).unwrap()

      if (formData[0]) {
        setLoading(true)
        await updateUserAvatar(formData[0]).unwrap()
        setLoading(false)
      }

      setError('')
      setButtonText('Сохранено')
      location.reload()
    } catch {
      setButtonText('Сохранить')
      setIsBlocked(false)

      setError('Ошибка. Попробуйте еще раз.')
    }

    formData = []
  }

  return (
    <div className={classes.wrapper}>
      <AvatarBlock
        user={user}
        formData={formData}
        avatarError={avatarError}
        loading={loading}
        setIsBlocked={setIsBlocked}
      />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.nameWrapper}>
          <div className={classes.inputWrapper}>
            <label className={classes.label}>
              <span className={classes.labelText}>Имя</span>
              <input
                className={classes.input}
                placeholder="Имя"
                {...register('name')}
                value={fieldValue.name}
                onChange={(e) => handleFieldChange(e, 'name')}
              />
            </label>
          </div>

          <div className={classes.inputWrapper}>
            <label className={classes.label}>
              <span className={classes.labelText}>Фамилия</span>
              <input
                className={classes.input}
                placeholder="Фамилия"
                {...register('surname')}
                value={fieldValue.surname}
                onChange={(e) => handleFieldChange(e, 'surname')}
              />
            </label>
          </div>
        </div>

        <div className={cn(classes.inputWrapper, classes.sizeL)}>
          <label className={classes.label}>
            <span className={classes.labelText}>Город</span>
            <input
              className={classes.input}
              placeholder="Город"
              {...register('city')}
              value={fieldValue.city}
              onChange={(e) => handleFieldChange(e, 'city')}
            />
          </label>
        </div>
        <div className={cn(classes.inputWrapper, classes.sizeL)}>
          <label className={classes.label}>
            <span className={classes.labelText}>Телефон</span>
            <input
              className={classes.input}
              type="tel"
              placeholder="Телефон"
              {...register('phone')}
              value={phone}
              onChange={handleChangePhone}
            />
          </label>
        </div>
        <Button
          type="submit"
          btnName="main"
          className={cn(classes.button, isBlocked && classes.disabled)}
        >
          {buttonText}
        </Button>
        <span>{error}</span>
      </form>
    </div>
  )
}

export default UserSettings
