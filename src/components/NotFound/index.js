import NavBar from '../Navbar'

import './index.css'

const errorMsg = "we're sorry, the page you requested could not be found"

const NotFound = () => (
  <div className="not-found-main-container">
    <NavBar />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">{errorMsg}</p>
    </div>
  </div>
)

export default NotFound
