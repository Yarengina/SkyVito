/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../../components/Ui/Button'
import UpdateAdsImages from '../../components/UpdateAdsImages'
import { NUMBER_OF_IMAGES, validPrice, regexp } from '../../utils/constants'
import {
  useCreateAdMutation,
  useUpdateAdImageMutation,
} from '../../redux/API/adsApi'
let updatedImagesArray = Array.from(Array(NUMBER_OF_IMAGES))
let formData = Array.from(Array(NUMBER_OF_IMAGES))
import BackIcon from '../../components/Icons/BackIcon'
import PageWrapper from '../../components/PageWrapper'
import classes from './index.module.css'
import cn from 'classnames'

const CreateAdPage = () => {
  const initialValue = {
    title: '',
    description: '',
    price: '',
  }

  const navigate = useNavigate()

  const [fieldValue, setFieldValue] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState('Опубликовать')
  const [price, setPrice] = useState('')

  const [createAd] = useCreateAdMutation()
  const [updateImage] = useUpdateAdImageMutation()

  const isFormValid = fieldValue.title?.length && price.toString().length

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const handleFieldChange = (e, field) => {
    setButtonText('Опубликовать')
    setFieldValue((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePrice = (e) => {
    const inputPriceValue = e.target.value

    if (regexp.test(inputPriceValue)) {
      e.target.value = inputPriceValue.replace(regexp, '')
    }

    setPrice(e.target.value)
    setButtonText('Опубликовать')
  }

  const handleBack = () => {
    navigate(-1)
  }

  const onSubmit = async (data) => {
    let createdAdId

    try {
      setLoading(true)
      setButtonText('Публикуется...')

      const response = await createAd({
        title: data.title,
        price: Number(data.price),
        description: data.description,
      }).unwrap()

      createdAdId = response.id

      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        if (formData[i] && createdAdId) {
          await updateImage({
            id: createdAdId,
            body: formData[i],
          }).unwrap()
        }
      }

      setLoading(false)
      setButtonText('Опубликовано')
      setTimeout(() => navigate(`/ads/${createdAdId}`), 800)
    } catch (error) {
      setLoading(false)
      setButtonText('Ошибка')
      console.log(error)
    }

    formData = formData.map((element) => undefined)
    updatedImagesArray = updatedImagesArray.map((element) => undefined)
  }

  return (
    <PageWrapper>
      <div className={classes.backWrapper}>
        <div onClick={handleBack}>
          <BackIcon className={classes.back} />
        </div>
        <h2 className={classes.title}>Новое объявление</h2>
      </div>
      <div className={classes.scrollWrapper}>
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
                rows={1}
                placeholder="Введите описание"
                value={fieldValue.description}
                onChange={(e) => handleFieldChange(e, 'description')}
              ></textarea>
            </label>
          </div>

          <div className={classes.content}>
            <p className={classes.subtitle}>
              Фотографии товара{' '}
              <span>не более {NUMBER_OF_IMAGES} фотографий</span>
            </p>
            <div className={classes.imgBlock}>
              <UpdateAdsImages
                formData={formData}
                updatedImagesArray={updatedImagesArray}
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
                  value={price}
                  data-cy="create-price"
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
    </PageWrapper>
  )
}

export default CreateAdPage
