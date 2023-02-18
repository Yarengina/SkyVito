import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { NO_IMAGE, SCREEN_SIZE } from '../../utils/constants'
import BackIcon from '../Icons/BackIcon'
import classes from './index.module.css'

const Images = ({ images }) => {
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const navigate = useNavigate()

  const [imgUrl, setImgUrl] = useState(images[0] ? images[0] : NO_IMAGE)

  const handleShowImage = (e) => {
    let target = e.target.src
    setImgUrl(target)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className={classes.imgCenter}>
        {isMobile && (
          <div onClick={handleBack} className={classes.backWrapper}>
            <BackIcon className={classes.back} />
          </div>
        )}
        <img src={imgUrl} alt="image" />
      </div>
      <div className={classes.imgBar}>
        {images.map((img, index) => (
          <div className={classes.img} key={index} onClick={handleShowImage}>
            <img src={img} alt="image" />
          </div>
        ))}
      </div>
    </>
  )
}

export default Images
