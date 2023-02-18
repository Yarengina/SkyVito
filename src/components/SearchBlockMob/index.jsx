import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../../redux/store/slices/filteredAdsSlice'
import { querySelector } from '../../redux/store/selectors/querySelector'
import classes from './index.module.css'

const SearchBlockMob = () => {
    const dispatch = useDispatch()

  const storeQuery = useSelector(querySelector)

  const [newQuery, setNewQuery] = useState(storeQuery || '')

  useEffect(() => {
    return () => {
      dispatch(setQuery(''))
    }
  }, [])

  const handleChange = (e) => {
    setNewQuery(e.target.value)
    dispatch(setQuery(newQuery))

    if (e.target.value === '') {
      dispatch(setQuery(''))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setQuery(newQuery))
  }

  return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes.input}
          type="search"
          placeholder="Поиск по объявлениям"
          value={newQuery}
          onChange={handleChange}
        />
      </form>
  )
}