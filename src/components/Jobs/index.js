import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Navbar from '../Navbar'
import JobSection from '../JobSection'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const initialRenderStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    jobRenderStatus: 'INITIAL',
    profileRenderStatus: 'INITIAL',
    profileData: [],
    jobsData: [],
    searchInput: '',
    workType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileRenderStatus: initialRenderStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const profileData = data.profile_details
      const updatedData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileRenderStatus: initialRenderStatus.success,
      })
    } else {
      this.setState({profileRenderStatus: initialRenderStatus.failure})
    }
  }

  getJobsDetails = async () => {
    const {workType, salaryRange, searchInput} = this.state
    const updatedWorkType = workType.join(',')
    console.log(updatedWorkType)
    this.setState({jobRenderStatus: initialRenderStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${updatedWorkType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        packagePerAnnum: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({
        jobsData: updatedData,
        jobRenderStatus:
          updatedData.length === 0 ? 'NO JOBS' : initialRenderStatus.success,
      })
    } else {
      this.setState({jobRenderStatus: initialRenderStatus.failure})
    }
  }

  getWorkTypeId = event => {
    const type = event.target.value
    const isChecked = event.target.checked
    console.log(type, isChecked)
    const {workType} = this.state
    const updatedWorkType = isChecked
      ? [...workType, type]
      : workType.filter(eachItem => eachItem !== type)
    this.setState({workType: updatedWorkType}, this.getJobsDetails)
  }

  renderWorkType = () => (
    <>
      <h1 className="categoryHeading">Type of Emplyment</h1>
      <ul className="categoryUls">
        {employmentTypesList.map(eachObj => (
          <li key={eachObj.employmentTypeId}>
            <input
              id={eachObj.employmentTypeId}
              value={eachObj.employmentTypeId}
              onChange={this.getWorkTypeId}
              type="checkbox"
              className="checkbox"
            />

            <label htmlFor={eachObj.employmentTypeId} className="categoryLabel">
              {eachObj.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  getSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsDetails)
  }

  renderRangeType = () => (
    <>
      <h1 className="categoryHeading">Salary Range</h1>
      <ul className="categoryUls">
        {salaryRangesList.map(eachObj => (
          <li key={eachObj.salaryRangeId}>
            <input
              id={eachObj.salaryRangeId}
              value={eachObj.salaryRangeId}
              type="radio"
              name="salary"
              className="checkbox"
              onChange={this.getSalaryRange}
            />
            <label htmlFor={eachObj.salaryRangeId} className="categoryLabel">
              {eachObj.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  renderProfileDetails = () => {
    const {profileData, searchInput} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <>
        <div className="searchBar">
          <input
            placeholder="search"
            onChange={this.onChangeInput}
            type="search"
            value={searchInput}
            className="jobsearchInput"
          />
          <button
            type="button"
            aria-label="search button"
            className="jobSearchBtn"
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
        <div className="profileContainer">
          <div className="profileSectionContainer">
            <img src={profileImageUrl} alt="profile" className="profileImg" />
            <h1 className="profileName">{name}</h1>
            <p className="profileBio">{shortBio}</p>
          </div>
        </div>
      </>
    )
  }

  renderProgress = () => (
    <div className="loader">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failureContainer">
      <button
        type="button"
        className="jobFailureRetryBtn"
        onClick={this.retringTheFetch}
      >
        Retry
      </button>
    </div>
  )

  renderProfileRenderStatus = () => {
    const {profileRenderStatus} = this.state
    switch (profileRenderStatus) {
      case initialRenderStatus.success:
        return this.renderProfileDetails()
      case initialRenderStatus.progress:
        return this.renderProgress()
      case initialRenderStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  onChangeInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onClickToSearchInput = () => this.getJobsDetails()

  noProductsView = () => (
    <div className="noJobsView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="noJobsHeading">No Jobs Found</h1>
      <p className="noJobsPara">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobDetails = () => {
    const {jobsData} = this.state
    return (
      <ul className="jobsUl">
        {jobsData.map(eachObj => (
          <JobSection data={eachObj} key={eachObj.id} />
        ))}
      </ul>
    )
  }

  retringTheFetch = () => this.getJobsDetails()

  renderFailureJobsDetails = () => (
    <div className="failureJobfetchContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failureBtn"
        onClick={this.retringTheFetch}
      >
        Retry
      </button>
    </div>
  )

  renderJobsRenderStatus = () => {
    const {jobRenderStatus} = this.state
    switch (jobRenderStatus) {
      case initialRenderStatus.success:
        return this.renderJobDetails()
      case initialRenderStatus.failure:
        return this.renderFailureJobsDetails()
      case initialRenderStatus.progress:
        return this.renderProgress()
      case 'NO JOBS':
        return this.noProductsView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobsContainer">
        <Navbar />
        <div className="jobsSectionContainer">
          <div className="categorySection">
            {this.renderProfileRenderStatus()}

            <hr />
            <div className="categories">
              {this.renderWorkType()}
              <hr />
              {this.renderRangeType()}
            </div>
          </div>
          <div className="JobsSection">
            <div className="job-search-bar-container">
              <input
                placeholder="search"
                onChange={this.onChangeInput}
                type="search"
                value={searchInput}
                className="jobsearchInput"
              />
              <button
                type="button"
                data-testid="searchButton"
                aria-label="search button"
                className="jobSearchBtn"
                onClick={this.onClickToSearchInput}
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsRenderStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
