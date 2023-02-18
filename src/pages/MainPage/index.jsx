import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utils/constants'
import PageWrapper from '../../components/PageWrapper'
import SearchBlock from '../../components/SearchBlock'
import Ads from '../../components/Ads'
import classes from './index.module.css'

const MainPage = () => {
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })

  return (
    <PageWrapper searchBlock={true}>
      {isDesktop && <SearchBlock />}
      <div className={classes.container}>
        <h2 className={classes.title}>Объявления</h2>
        <Ads />
      </div>
    </PageWrapper>
  )
}

export default MainPage
