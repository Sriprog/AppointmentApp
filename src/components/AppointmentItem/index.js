import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetail, onToggleIsStarred} = props
  const {id, title, email, date, isStarred} = AppointmentDetail

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    onToggleIsStarred(id)
  }

  return (
    <li className="appoint-list">
      <div className="title-con">
        <p className="title">{title}</p>
        <button
          testid="star"
          onClick={onClickFavoriteIcon}
          type="button"
          className="btn"
        >
          <img className="img" alt="star" src={starImgUrl} />
        </button>
      </div>
      <p className="para">Date: {date}</p>
      <p className="para"> {email}</p>
    </li>
  )
}

export default AppointmentItem
