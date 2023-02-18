import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdsItem from '../AdsItem'
import { useGetAdsQuery } from '../../redux/API/adsApi'
import { filteredAdsSelector } from '../../redux/store/selectors/filteredAds'
import { querySelector } from '../../redux/store/selectors/querySelector'
import { setAds } from '../../redux/store/slices/adsSlice'
import classes from './index.module.css'

const Ads = ({ sellerId, isProfilePage }) => {
  const dispatch = useDispatch()

  const filteredAds = useSelector(filteredAdsSelector)
  const query = useSelector(querySelector)

  const { data: ads, isLoading, isError } = useGetAdsQuery(sellerId)

  useEffect(() => {
    if (!query && ads) {
      dispatch(setAds(ads))
    }
  }, [ads])

  if (isLoading) {
    return <p className={classes.notice}>Загрузка...</p>
  }

  if (isError) {
    return (
      <p className={classes.notice}>
        Извините, произошла ошибка. {JSON.stringify(isError)}
      </p>
    )
  }

  return (
    <>
      {!filteredAds?.length && (
        <p className={classes.notice}>
          {isProfilePage
            ? 'Товары еще не добавлены'
            : 'По вашему запросу ничего не найдено'}
        </p>
      )}
      <div className={classes.content}>
        {filteredAds.map((item) => (
          <AdsItem key={item.title} item={item} />
        ))}
      </div>
    </>
  )
}

export default Ads
