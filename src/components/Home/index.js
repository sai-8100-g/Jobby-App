import {Component} from 'react'
import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  redirectToJobsPage = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="mainHomeContainer">
        <Navbar />
        <div className="homeInfoContainer">
          <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
          <p className="homePara">
            Millions of people are searching for jobs, salary information,
            company reviews. Find your job that fits your abilities and
            Potential
          </p>
          <button
            type="button"
            className="homeBtn"
            onClick={this.redirectToJobsPage}
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
