/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Ui/Button'
import { NUMBER_OF_IMAGES, validPrice, regexp } from '../../../utils/constants'
import {
  useChangeAdDetailsMutation,
  useDeleteAdImageMutation,
  useUpdateAdImageMutation,
} from '../../../redux/API/adsApi'
import AdsImages from '../../AdsImages'
import classes from './index.module.css'
import cn from 'classnames'

let updatedImagesArray = Array.from(Array(NUMBER_OF_IMAGES))
let formData = Array.from(Array(NUMBER_OF_IMAGES))
let urlArrayForDeleting = []

const AdSettings = ({ setIsOpened, ad }) => {
  const initialValue = {
    title: ad.title,
    description: ad.description,
    price: ad.price,
  }

  const [fieldValue, setFieldValue] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState('Сохранить')
  const [price, setPrice] = useState(ad?.price.toString() || '')
  const [deleting, setDeleting] = useState(false)

  const [changeAdDetails] = useChangeAdDetailsMutation()
  const [updateImage] = useUpdateAdImageMutation()
  const [deleteImage] = useDeleteAdImageMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const handleFieldChange = (e, field) => {
    setButtonText('Сохранить')
    setFieldValue((prev) => ({ ...prev, [field]: e.target.value }))
  }
  const handleChangePrice = (e) => {
    const inputPriceValue = e.target.value

    if (regexp.test(inputPriceValue)) {
      e.target.value = inputPriceValue.replace(regexp, '')
    }

    setPrice(e.target.value)
    setButtonText('Сохранить')
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setButtonText('Сохраняется...')

      await changeAdDetails({
        id: ad.id,
        body: {
          title: data.title,
          price: data.price,
          description: data.description,
        },
      }).unwrap()

      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        if (formData[i] && ad.id) {
          await updateImage({ id: ad.id, body: formData[i] }).unwrap()
        }
      }

      for (let i = 0; i < urlArrayForDeleting.length; i++) {
        if (deleting) {
          return
        }

        setDeleting(true)

        try {
          await deleteImage({
            id: ad.id,
            imgUrl: urlArrayForDeleting[i],
          }).unwrap()
        } catch (error) {
          console.log(error)
          setLoading(false)
          setButtonText('Ошибка')
        }
        setDeleting(false)
      }

      setLoading(false)
      setButtonText('Сохранено')
      location.reload()
      setTimeout(() => setIsOpened(false), 800)
    } catch {
      setLoading(false)
      setButtonText('Ошибка')
    }

    formData = formData.map((element) => undefined)
    updatedImagesArray = updatedImagesArray.map((element) => undefined)
    urlArrayForDeleting = []
  }

  const isFormValid = fieldValue.title?.length && price.toString().length

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Редактировать объявление</h3>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.content}>
          <label className={classes.label}>
            Название
            <input
              {...register('title', {
                required: 'Введите название',
              })}
              className={classes.input}
              type="text"
              placeholder="Введите название"
              value={fieldValue.title || ''}
              onChange={(e) => handleFieldChange(e, 'title')}
              autoFocus
            />
          </label>
          {errors.title && (
            <span className={classes.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={classes.content}>
          <label className={classes.label}>
            Описание
            <textarea
              {...register('description')}
              className={classes.area}
              cols="auto"
              rows="10"
              placeholder="Введите описание"
              value={fieldValue.description}
              onChange={(e) => handleFieldChange(e, 'description')}
            />
          </label>
        </div>

        <div className={classes.content}>
          <p className={classes.subtitle}>
            Фотографии товара<span>не более {NUMBER_OF_IMAGES} фотографий</span>
          </p>
          <div className={classes.imgBlock}>
            <AdsImages
              ad={ad}
              formData={formData}
              updatedImagesArray={updatedImagesArray}
              urlArrayForDeleting={urlArrayForDeleting}
            />
          </div>
        </div>

        <div className={cn(classes.content, classes.priceBlock)}>
          <label className={classes.label}>
            Цена
            <div className={classes.priceArea}>
              <input
                {...register('price', {
                  required: 'Введите корректную цену',
                  pattern: {
                    value: validPrice,
                    message: 'Введите корректную цену',
                  },
                })}
                className={cn(classes.input, classes.priceInput)}
                type="text"
                value={price}
                onChange={handleChangePrice}
              />
              <div className={classes.cost}>₽</div>
            </div>
          </label>
        </div>

        <Button
          type="submit"
          btnName="disabled"
          className={cn(
            classes.button,
            isFormValid && !loading && classes.btnSubmit
          )}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

export default AdSettings
