import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword} = props
  const {
    id,
    websiteInput,
    usernameInput,
    passwordInput,
    showPassword,
  } = passwordDetails
  const onClickDeletePassword = () => {
    deletePassword(id)
  }
  const imgUrl =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png '

  return (
    <li className="list-item">
      <p className="website-logo">{websiteInput[0]}</p>
      <div className="details-container">
        <p>{websiteInput}</p>
        <p>{usernameInput}</p>
        {showPassword ? (
          <p>{passwordInput}</p>
        ) : (
          <img src={imgUrl} alt="stars" className="stars-image" />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}
export default PasswordItem
