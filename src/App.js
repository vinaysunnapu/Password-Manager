import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'
import PasswordItem from './components/PasswordItem'

class App extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchItem: '',
  }

  onChangeSearch = event => {
    this.setState({searchItem: event.target.value})
  }

  onChecked = event => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.map(eachList => {
        if (event.target.checked) {
          return {...eachList, showPassword: true}
        }

        return {...eachList, showPassword: false}
      }),
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const updatedItems = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: updatedItems})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  addPasswords = event => {
    event.preventDefault()
    const {usernameInput, passwordInput, websiteInput} = this.state
    if (usernameInput !== '' && passwordInput !== '' && websiteInput !== '') {
      this.getAddPasswords()
    }
  }

  getAddPasswords = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      websiteInput,
      usernameInput,
      passwordInput,
      showPassword: false,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      passwordList,
      usernameInput,
      websiteInput,
      passwordInput,
      searchItem,
    } = this.state
    const isShowPasswords = passwordList.length > 0

    const searchList = passwordList.filter(eachList =>
      eachList.usernameInput.toLowerCase().includes(searchItem.toLowerCase()),
    )

    const count = searchList.length

    return (
      <div className="main-bg-container">
        <div className="bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-image"
          />
          <div className="form-bg-container">
            <div className="form-container">
              <h1 className="add-new-pass-heading">Add New Password</h1>
              <form className="form-input-container">
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                  <input
                    type="text"
                    value={websiteInput}
                    className="input-element"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                  <input
                    type="text"
                    value={usernameInput}
                    className="input-element"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                  <input
                    type="password"
                    value={passwordInput}
                    className="input-element"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                  />
                </div>
                <button
                  type="submit"
                  className="add-button"
                  onClick={this.addPasswords}
                >
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
          <div className="passwords-bg-container">
            <div className="your-passwords-container">
              <div className="passwords-count-container">
                <h1 className="your-password-heading">Your Passwords</h1>
                <p className="password-count">{count}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                onClick={this.onChecked}
                id="checkboxId"
              />
              <label className="checkbox-para" htmlFor="checkboxId">
                Show passwords
              </label>
            </div>
            {isShowPasswords ? (
              <ul className="passwords-list-container">
                {searchList.map(eachItem => (
                  <PasswordItem
                    passwordDetails={eachItem}
                    key={eachItem.id}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords-heading">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default App
