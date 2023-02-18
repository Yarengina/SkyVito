import { useEffect, useState } from 'react'
import { NUMBER_OF_IMAGES } from '../../utils/constants'
import AddImage from '../Icons/AddImage'
import classes from './index.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

const UpdateAdsImages = ({ formData, updatedImagesArray }) => {
  const [updateImages, setUpdateImages] = useState(updatedImagesArray)

  useEffect(() => {
    setUpdateImages(updatedImagesArray)
  }, [updatedImagesArray])

  const handleChange = async (event, index) => {
    const files = event.target.files
    const file = files ? files[0] : null

    setUpdateImages((prev) => [
      ...prev.slice(0, index),
      file,
      ...prev.slice(index + 1),
    ])

    formData[index] = new FormData()
    formData[index].append('file', file)
  }

  const handleDeleteImages = (index) => {
    setUpdateImages((prev) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    formData[index] = undefined
  }

  return (
    <>
      {imgArray?.map((el, index) => (
        <div key={el} className={classes.img}>
          {updateImages[index] && (
            <div className={classes.img}>
              <img
                width="100%"
                height="100%"
                src={URL.createObjectURL(updateImages[index])}
              />
              <div
                className={classes.close}
                onClick={() => handleDeleteImages(index)}
              />
            </div>
          )}

          {!updateImages[index] && (
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

export default UpdateAdsImages
