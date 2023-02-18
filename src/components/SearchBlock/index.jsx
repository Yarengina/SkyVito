import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utils/constants'
import Button from '../Ui/Button'
import Logo from '../Ui/Logo'
import { setQuery } from '../../redux/store/slices/filteredAdsSlice'
import { querySelector } from '../../redux/store/selectors/querySelector'
import classes from './index.module.css'

const SearchBlock = () => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

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
    <>
      {isDesktop && (
        <div className={classes.container}>
          <Logo />
          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              className={classes.input}
              type="search"
              placeholder="Поиск по объявлениям"
              value={newQuery}
              onChange={handleChange}
            />
            <Button type="submit" btnName="main">
              Найти
            </Button>
          </form>
        </div>
      )}
      {isMobile && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            className={classes.input}
            type="search"
            placeholder="Поиск"
            value={newQuery}
            onChange={handleChange}
          />
        </form>
      )}
    </>
  )
}

export default SearchBlock
