import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { accessTokenSelector } from '../../redux/store/selectors/tokens'
import Header from '../Header'
import Footer from '../Footer'
import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utils/constants'

import classes from './index.module.css'

const PageWrapper = ({ children, searchBlock = false }) => {
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const [cookies] = useCookies(['access', 'refresh'])

  const access_token = useSelector(accessTokenSelector)

  const isLoggedIn = cookies && cookies.access && access_token ? true : false

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Header isLoggedIn={isLoggedIn} searchBlock={searchBlock} />
        <main className={classes.main}>{children}</main>
        {isMobile && <Footer />}
      </div>
    </div>
  )
}

export default PageWrapper
