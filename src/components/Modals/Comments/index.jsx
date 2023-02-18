import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../Ui/Button'
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
} from '../../../redux/API/adsApi'
import { API_URL, NO_AVATAR } from '../../../utils/constants'
import { formatDateForComments } from '../../../utils/utils'
import classes from './index.module.css'
import cn from 'classnames'

const Comments = ({ adId, setIsOpened }) => {
  const { data, isLoading } = useGetCommentsQuery(adId)
  const [createComment] = useCreateCommentMutation()

  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [buttonText, setButtonText] = useState('Опубликовать')

  const handleChange = (e) => {
    setButtonText('Опубликовать')
    setComment(e.target.value)
  }

  const onSubmit = async (newComment) => {
    try {
      setLoading(true)
      setButtonText('Публикуется...')

      await createComment({
        adId,
        body: {
          text: newComment.text,
        },
      }).unwrap()

      setButtonText('Опубликовано')
      location.reload()
      setTimeout(() => setIsOpened(false), 800)
      setComment('')
      setLoading(false)
    } catch (error) {
      setButtonText('Ошибка')
      console.log(error)
    }
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Отзывы о товаре</h3>
      <div className={classes.scrollWrapper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.content}>
            <label className={classes.label}>
              Добавить отзыв
              <textarea
                {...register('text')}
                className={classes.area}
                cols="auto"
                rows="5"
                placeholder="Введите описание"
                onChange={handleChange}
                value={comment}
              ></textarea>
            </label>
          </div>
          <Button
            type="submit"
            btnName="disabled"
            className={cn(classes.button, loading && classes.btnSubmit)}
          >
            {buttonText}
          </Button>
        </form>
        <div className={classes.commentsBlock}>
          {isLoading && <p>Загрузка отзывов...</p>}

          {!isLoading && !data?.length && <p>Отзывов пока нет</p>}

          {data?.map((comment, index) => (
            <div
              key={comment.created_on + index}
              className={classes.commentWrapper}
            >
              <div className={classes.comment}>
                <div className={classes.commentAvatar}>
                  <div className={classes.img}>
                    <img
                      src={
                        comment.author.avatar
                          ? API_URL + comment.author.avatar
                          : NO_AVATAR
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className={classes.commentText}>
                  <p className={classes.name}>
                    {comment.author.name}{' '}
                    <span>{formatDateForComments(comment.created_on)}</span>
                  </p>
                  <h4 className={classes.textTitle}>Комментарий</h4>
                  <p className={classes.text}>{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Comments
