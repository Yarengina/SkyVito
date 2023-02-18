import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utils/constants'
import PageWrapper from '../../components/PageWrapper'
import LogoBackBlock from '../../components/LogoBackBlock'
import Button from '../../components/Ui/Button'
import Modal from '../../components/Modals'
import AdSettings from '../../components/Modals/AdSettings'
import Comments from '../../components/Modals/Comments'
import { NumberOfComments } from '../../components/NumberOfComments'
import Images from '../../components/Images'
import NoImages from '../../components/NoImages'
import SellerPhoneButton from '../../components/SellerPhoneButton'
import { API_URL, NO_AVATAR } from '../../utils/constants'
import {
  titleCase,
  convertDate,
  formatSellsFrom,
  getUserEmailFromJWT,
} from '../../utils/utils'
import { useGetAdQuery, useDeleteAdMutation } from '../../redux/API/adsApi'
import { accessTokenSelector } from '../../redux/store/selectors/tokens'
import classes from './index.module.css'

const AdsPage = () => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const adId = Number(useParams()?.id)
  const navigate = useNavigate()

  const access_token = useSelector(accessTokenSelector)

  const userEmail = access_token ? getUserEmailFromJWT(access_token) : ''

  const { data, isLoading, isError } = useGetAdQuery(adId)
  const [delAd] = useDeleteAdMutation()

  const isSeller = userEmail === data?.user.email

  const [buttonText, setButtonText] = useState('Снять с публикации')
  const [isAdSettingsVisible, setAdSettingsVisible] = useState(false)
  const [isCommentsVisible, setCommentsVisible] = useState(false)

  const convertImages = (imagesIn) => {
    return imagesIn.map((img) => img.url && API_URL + img.url)
  }

  const imagesIn = data && data.images ? data.images : []
  const images = convertImages(imagesIn)

  const authorName = data?.user?.name || data?.user?.email
  const sells_from = data?.user?.sells_from

  const openCloseAdSettings = () => {
    if (isDesktop) {
      setAdSettingsVisible(!isAdSettingsVisible)
    }
    if (isMobile && data?.id) {
      navigate(`/settings/${data?.id}`)
    }
  }

  const openCloseComments = () => {
    if (isDesktop) {
      setCommentsVisible(!isCommentsVisible)
    }
    if (isMobile && data?.id) {
      navigate(`/comments/${data?.id}`)
    }
  }

  const handleDeleteAd = async () => {
    if (data && data.id) {
      try {
        await delAd(data.id).unwrap()
        navigate('/profile')
      } catch (error) {
        console.log(error)
        setButtonText('Ошибка')
      }
    }
  }

  return (
    <>
      <PageWrapper>
        {isDesktop && <LogoBackBlock />}
        {isLoading && <p className={classes.notice}>Загрузка...</p>}
        {!isLoading && !data && !isError && (
          <p className={classes.notice}>Такого объявления нет.</p>
        )}
        {isError && (
          <p className={classes.notice}>Извините, произошла ошибка!</p>
        )}

        {!isLoading && data && (
          <>
            <div className={classes.wrapper}>
              <div className={classes.imagesBlock}>
                <div className={classes.images}>
                  {data && data.images.length > 0 ? (
                    <Images images={images} />
                  ) : (
                    <NoImages />
                  )}
                </div>
              </div>
              <div className={classes.descriptionBlock}>
                <div className={classes.description}>
                  <h3 className={classes.title}>{titleCase(data?.title)}</h3>
                  <div className={classes.infoBlock}>
                    <p className={classes.info}>
                      {convertDate(data?.created_on || '')}
                    </p>
                    <p className={classes.info}>{data?.user?.city}</p>
                    <p className={classes.comment} onClick={openCloseComments}>
                      <NumberOfComments adId={adId} />
                    </p>
                  </div>
                  <p className={classes.price}>
                    {data?.price.toLocaleString()}&nbsp;₽
                  </p>
                  {!isSeller ? (
                    <SellerPhoneButton phone={data?.user.phone} />
                  ) : (
                    <div className={classes.buttons}>
                      <Button
                        btnName="main"
                        className={classes.btnRedact}
                        onClick={openCloseAdSettings}
                      >
                        Редактировать
                      </Button>
                      <Button
                        btnName="main"
                        className={classes.btnRemove}
                        onClick={handleDeleteAd}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  )}

                  <div className={classes.authorBlock}>
                    <Link to={`/seller/${data?.user?.id}`}>
                      <div className={classes.authorImg}>
                        <img
                          src={
                            data?.user?.avatar
                              ? API_URL + data?.user?.avatar
                              : NO_AVATAR
                          }
                          alt="avatar"
                        />
                      </div>
                    </Link>

                    <div className={classes.authorInfo}>
                      <Link to={`/seller/${data?.user?.id}`}>
                        <p className={classes.authorName}>{authorName}</p>
                      </Link>
                      <p className={classes.authorAbout}>
                        Продает товары с&nbsp;
                        {sells_from && formatSellsFrom(sells_from)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.main}>
              <h3 className={classes.subtitle}>Описание товара</h3>
              <div className={classes.textWrapper}>
                <p className={classes.text}>{data?.description}</p>
              </div>
            </div>
          </>
        )}
      </PageWrapper>
      {isAdSettingsVisible && (
        <Modal onClick={openCloseAdSettings}>
          <AdSettings setIsOpened={setAdSettingsVisible} ad={data} />
        </Modal>
      )}
      {isCommentsVisible && (
        <Modal onClick={openCloseComments}>
          <Comments adId={adId} setIsOpened={setCommentsVisible} />
        </Modal>
      )}
    </>
  )
}

export default AdsPage
