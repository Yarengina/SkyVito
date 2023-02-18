import classes from './index.module.css'

const AddImage = () => {
  return (
    <div className={classes.square}>
      <svg
        className={classes.icon}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 0V30" strokeWidth="3" />
        <path d="M30 15L1.10269e-06 15" strokeWidth="3" />
      </svg>
      <img src="" alt="" />
    </div>
  )
}

export default AddImage
