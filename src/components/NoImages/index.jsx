import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { NO_IMAGE, NUMBER_OF_IMAGES, SCREEN_SIZE } from '../../utils/constants'
import BackIcon from '../Icons/BackIcon'
import classes from './index.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

const NoImages = () => {
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const navigate = useNavigate()

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
        <img src={NO_IMAGE} alt="no_image" />
      </div>
      {!isMobile && (
        <div className={classes.imgBar}>
          {imgArray.map((index) => (
            <div className={classes.img} key={index}>
              <img src={NO_IMAGE} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default NoImages
