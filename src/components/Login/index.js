import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const msg = 'Required'

class Login extends Component {
  state = {
    nameError: '',
    codeError: '',
    nameInput: '',
    codeInput: '',
    errorMsg: '',
  }

  onSuccessfullSubmission = JWT => {
    const {history} = this.props
    Cookies.set('jwt_token', JWT, {expires: 2})
    history.replace('/')
  }

  onFailureSubmission = error => {
    this.setState({errorMsg: error})
  }

  onSubmitUserDetails = async event => {
    console.log('onSubmit')
    const {nameInput, codeInput} = this.state
    event.preventDefault()
    const userDetails = {username: nameInput, password: codeInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfullSubmission(data.jwt_token)
    } else {
      this.onFailureSubmission(data.error_msg)
    }
  }

  onBlurNameInput = event => {
    if (event.target.value === '') {
      this.setState({nameError: msg})
    } else {
      this.setState({nameError: ''})
    }
  }

  onBlurPasswordInput = event => {
    if (event.target.value === '') {
      this.setState({codeError: msg})
    } else {
      this.setState({codeError: ''})
    }
  }

  onChangeNameInput = e => {
    this.setState({nameInput: e.target.value})
  }

  onChangeCodeInput = e => {
    this.setState({codeInput: e.target.value})
  }

  websiteLogo = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="loginLogo"
    />
  )

  userNameInput = () => {
    const {nameError, nameInput} = this.state
    return (
      <div className="userInput">
        <label className="loginLabels" htmlFor="userName">
          USERNAME
        </label>
        <input
          id="userName"
          onBlur={this.onBlurNameInput}
          onChange={this.onChangeNameInput}
          placeholder="USERNAME"
          value={nameInput}
          className="loginInputs"
          type="text"
        />
        {nameError && <p className="error-msg">{nameError}</p>}
      </div>
    )
  }

  passwordInput = () => {
    const {codeError, codeInput} = this.state
    return (
      <div className="userInput">
        <label className="loginLabels" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          onBlur={this.onBlurPasswordInput}
          onChange={this.onChangeCodeInput}
          placeholder="PASSWORD"
          value={codeInput}
          className="loginInputs"
          type="password"
        />
        {codeError && <p className="error-msg">{codeError}</p>}
      </div>
    )
  }

  submitBtn = () => (
    <button type="submit" className="loginBtn">
      Login
    </button>
  )

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginMainContainer">
        <form className="userForm" onSubmit={this.onSubmitUserDetails}>
          {this.websiteLogo()}
          {this.userNameInput()}
          {this.passwordInput()}
          {this.submitBtn()}
          {errorMsg && <p className="error-msg error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
