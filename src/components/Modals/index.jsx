import classes from './index.module.css'
import Portal from '../Portal'

const Modal = ({ children, onClick }) => {
  return (
    <Portal>
      <div className={classes.wrapper}>
        <div className={classes.modal}>
          {children}
          <div className={classes.close} onClick={onClick} />
        </div>
      </div>
    </Portal>
  )
}

export default Modal
