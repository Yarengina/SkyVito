import { useParams } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import LogoBackBlock from '../../components/LogoBackBlock'
import Ads from '../../components/Ads'
import SellerPhoneButton from '../../components/SellerPhoneButton'
import { formatSellsFrom } from '../../utils/utils'
import { API_URL, NO_AVATAR } from '../../utils/constants'
import { useGetAdsQuery } from '../../redux/API/adsApi'
import classes from './index.module.css'

const SellerPage = () => {
  const sellerId = Number(useParams()?.id)
  const { data, isLoading } = useGetAdsQuery(sellerId)

  return (
    <PageWrapper type="profile">
      <LogoBackBlock />
      <h2 className={classes.title}>Профиль продавца</h2>

      {isLoading && <p className={classes.notice}>Загрузка...</p>}

      {!isLoading && data && (
        <>
          <div className={classes.container}>
            <div className={classes.avatarWrapper}>
              <div className={classes.avatar}>
                <img
                  src={
                    data[0].user.avatar
                      ? API_URL + data[0].user.avatar
                      : NO_AVATAR
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <div className={classes.sellerBlock}>
              <h3 className={classes.name}>
                {data[0].user.name} {data[0].user.surname}
              </h3>
              <p className={classes.info}>{data[0].user.city}</p>
              <p className={classes.info}>
                Продает товары с {formatSellsFrom(data[0].user.sells_from)}
              </p>
              <SellerPhoneButton phone={data[0].user.phone} />
            </div>
          </div>
          <h3 className={classes.subtitle}>Товары продавца</h3>
          <Ads sellerId={sellerId} />
        </>
      )}
    </PageWrapper>
  )
}

export default SellerPage
