import { useParams, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import PageWrapper from '../../components/PageWrapper'
import BackIcon from '../../components/Icons/BackIcon'
import LogoBackBlock from '../../components/LogoBackBlock'
import Ads from '../../components/Ads'
import SellerPhoneButton from '../../components/SellerPhoneButton'
import { formatSellsFrom } from '../../utils/utils'
import { API_URL, NO_AVATAR, SCREEN_SIZE } from '../../utils/constants'
import { useGetAdsQuery } from '../../redux/API/adsApi'
import classes from './index.module.css'

const SellerPage = () => {
  const sellerId = Number(useParams()?.id)
  const { data, isLoading } = useGetAdsQuery(sellerId)

  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })

  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PageWrapper type="profile">
      {isDesktop && (
        <>
          <LogoBackBlock />
          <h2 className={classes.title}>Профиль продавца</h2>
        </>
      )}
      {isMobile && (
        <div className={classes.backWrapper}>
          <div onClick={handleBack}>
            <BackIcon className={classes.back} />
          </div>
          <h2 className={classes.title}>Профиль продавца</h2>
        </div>
      )}

      {isLoading && <p className={classes.notice}>Загрузка...</p>}

      {!isLoading && data && (
        <>
          <div className={classes.container}>
            {isDesktop && (
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
            )}

            <div className={classes.sellerBlock}>
              <h3 className={classes.name}>
                {data[0].user.name} {data[0].user.surname}
              </h3>
              <p className={classes.info}>{data[0].user.city}</p>
              <p className={classes.info}>
                Продает товары с {formatSellsFrom(data[0].user.sells_from)}
              </p>
              {isMobile && (
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
              )}
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
