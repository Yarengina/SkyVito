import { getEndingOfWord } from '../../utils/utils'
import { useGetCommentsQuery } from '../../redux/API/adsApi'

export const NumberOfComments = ({ adId }) => {
  const { data, isLoading } = useGetCommentsQuery(adId)

  const numberOfComments = data?.length

  return (
    <>
      {isLoading && 'Загрузка...'}
      {!!numberOfComments && (
        <span>
          {numberOfComments} отзыв{getEndingOfWord(numberOfComments)}
        </span>
      )}
      {!numberOfComments && !isLoading && 'Нет отзывов'}
    </>
  )
}
