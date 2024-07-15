import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {IoIosLogOut} from 'react-icons/io'

import './index.css'

class Navbar extends Component {
  onClickToLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickLogo = () => {
    const {history} = this.props
    history.replace('/')
  }

  websiteHomeLogo = () => (
    <Link className="navImg" to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="homeWebsiteLogo"
      />
    </Link>
  )

  navigationLinks = () => (
    <>
      <ul className="navMdUl">
        <li>
          <Link className="navLink" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navLink" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <ul className="navSmUl">
        <li>
          <Link className="navLink" to="/">
            <FaHome className="navIcons" />
          </Link>
        </li>
        <li>
          <Link className="navLink" to="/jobs">
            <MdWork className="navIcons" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            aria-label="Logout Button"
            className="logoutBtnIcon"
            onClick={this.onClickToLogout}
          >
            <IoIosLogOut className="navIcons" />
          </button>
        </li>
      </ul>
    </>
  )

  logoutButton = () => (
    <button type="button" className="logoutBtn" onClick={this.onClickToLogout}>
      Logout
    </button>
  )

  render() {
    return (
      <div>
        <nav>
          {this.websiteHomeLogo()}
          {this.navigationLinks()}
          {this.logoutButton()}
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
