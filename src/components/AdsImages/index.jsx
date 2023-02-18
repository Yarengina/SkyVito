import { useEffect, useState } from 'react'
import { NUMBER_OF_IMAGES, API_URL } from '../../utils/constants'
import AddImage from '../Icons/AddImage'
import classes from './index.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

const AdsImages = ({
  ad,
  formData,
  updatedImagesArray,
  urlArrayForDeleting,
}) => {
  const [updatedImages, setUpdatedImages] = useState(updatedImagesArray)
  const [oldImages, setOldImages] = useState(ad.images)

  const numberOfOldImages = oldImages.length
  const plusButtonArray = numberOfOldImages
    ? Array.from(Array(imgArray.length - numberOfOldImages).keys())
    : imgArray

  const handleDeleteNewImages = (index) => {
    setUpdatedImages((prev) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    formData[index] = undefined
  }

  const handleDeleteOldImages = (index) => {
    setUpdatedImages((prev) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    urlArrayForDeleting.push(oldImages[index].url)

    setOldImages((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])

    formData[index] = undefined
  }

  const handleChange = async (event, index) => {
    const files = event.target.files
    const file = files ? files[0] : null

    setUpdatedImages((prev) => [
      ...prev.slice(0, index),
      file,
      ...prev.slice(index + 1),
    ])

    formData[index] = new FormData()
    formData[index].append('file', file)
  }

  useEffect(() => {
    setUpdatedImages(updatedImagesArray)
  }, [updatedImagesArray])

  return (
    <>
      {oldImages.map((image, index) => (
        <div key={image.url} className={classes.img}>
          <img
            width="100%"
            height="100%"
            src={image.url ? API_URL + image.url : ''}
          />
          <div
            className={classes.close}
            onClick={() => handleDeleteOldImages(index)}
          />
        </div>
      ))}

      {numberOfOldImages < NUMBER_OF_IMAGES &&
        plusButtonArray.map((el, index) => (
          <div key={el} className={classes.img}>
            {updatedImages[index] && (
              <div className={classes.img}>
                <img
                  width="100%"
                  height="100%"
                  src={URL.createObjectURL(updatedImages[index])}
                />
                <div
                  className={classes.close}
                  onClick={() => handleDeleteNewImages(index)}
                />
              </div>
            )}

            {!updatedImages[index] && (
              <label className={classes.label}>
                <AddImage />
                <input
                  className={classes.input}
                  type="file"
                  onChange={(e) => handleChange(e, index)}
                  accept="image/*"
                />
              </label>
            )}
          </div>
        ))}
    </>
  )
}

export default AdsImages
