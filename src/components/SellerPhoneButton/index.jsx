import { useEffect, useState } from 'react'
import Button from '../Ui/Button'
import { formatPhone, formatHiddenPhone } from '../../utils/utils'
import classes from './index.module.css'

const SellerPhoneButton = (phone) => {
  const [sellerPhone, setSellerPhone] = useState(formatPhone(phone))

  const handleShowPhone = () => {
    setSellerPhone(formatPhone(phone.phone))
  }

  useEffect(() => {
    setSellerPhone(formatHiddenPhone(phone.phone))
  }, [phone])

  return (
    <>
      {sellerPhone ? (
        <Button
          btnName="main"
          className={classes.button}
          onClick={handleShowPhone}
        >
          <span>
            Показать&nbsp;телефон
            <br />
            {sellerPhone}
          </span>
        </Button>
      ) : (
        <Button btnName="main" className={classes.button}>
          Телефон не указан
        </Button>
      )}
    </>
  )
}

export default SellerPhoneButton
