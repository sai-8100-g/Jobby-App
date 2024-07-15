import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn, MdStar} from 'react-icons/md'
import {FaBusinessTime, FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import SimilarJobItems from '../SimilarJobItems'

import './index.css'

const initialStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemsDetails extends Component {
  state = {
    renderStatus: 'INITIAL',
    jobDetails: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({renderStatus: initialStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const details = data.job_details
      const updatedData = {
        companyLogoUrl: details.company_logo_url,
        companyWebsiteUrl: details.company_website_url,
        employmentType: details.employment_type,
        id: details.id,
        jobDescription: details.job_description,
        lifeAtCompany: {
          description: details.life_at_company.description,
          imageUrl: details.life_at_company.image_url,
        },
        imageUrl: details.image_url,
        location: details.location,
        packagePerAnnum: details.package_per_annum,
        rating: details.rating,
        title: details.title,
        skills: details.skills.map(eachObj => ({
          imageUrl: eachObj.image_url,
          name: eachObj.name,
        })),
        similarJobs: data.similar_jobs.map(eachObj => ({
          companyLogoUrl: eachObj.company_logo_url,
          employmentType: eachObj.employment_type,
          id: eachObj.id,
          jobDescription: eachObj.job_description,
          location: eachObj.location,
          rating: eachObj.rating,
          title: eachObj.title,
        })),
      }
      this.setState({
        jobDetails: updatedData,
        renderStatus: initialStatus.success,
      })
    } else {
      this.setState({renderStatus: initialStatus.failure})
    }
  }

  successRender = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      packagePerAnnum,
      location,
      employmentType,
      skills,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      similarJobs,
    } = jobDetails
    return (
      <>
        <div className="jobDetailsContainer">
          <div className="logoTitleContainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobDetailsLogo"
            />
            <div>
              <h1 className="detailHeading">{title}</h1>
              <div className="ratingStarContainer">
                <MdStar className="icons star" />
                <p className="detailsPara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="packageLocationTypeContainer">
            <div className="locationTypeContainer">
              <div className="locationContainer">
                <MdLocationOn className="icons" />
                <p className="detailsPara">{location}</p>
              </div>
              <div className="typeContainer">
                <FaBusinessTime className="icons" />
                <p className="detailsPara">{employmentType}</p>
              </div>
            </div>
            <p className="detailsPara">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <div className="headingAnchorContainer">
              <h1 className="detailHeading">Description</h1>
              <a className="anchorElement" href={companyWebsiteUrl}>
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="detailsPara">{jobDescription}</p>
          </div>
          <hr />
          <div>
            <h1 className="detailHeading">Skills</h1>
            <ul className="skillsUl">
              {skills.map(eachObj => (
                <li className="skillsListitem" key={eachObj.name}>
                  <img
                    src={eachObj.imageUrl}
                    className="skillsImg"
                    alt="name"
                  />
                  <p className="detailsPara">{eachObj.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lifeAtCompanyContainer">
            <div className="companyInfoContainer">
              <h1 className="detailHeading">Life at Company</h1>
              <p className="detailsPara">{lifeAtCompany.description}</p>
            </div>
            <div className="companyImgContainer">
              <img
                src={lifeAtCompany.imageUrl}
                alt="img"
                className="companyImg"
              />
            </div>
          </div>
        </div>
        <div className="similarJobsSection">
          <h1 className="detailHeading similarJobsHeading">Similar Jobs</h1>
          <ul className="similarJobsUl">
            {similarJobs.map(eachObj => (
              <SimilarJobItems data={eachObj} key={eachObj.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  progressRender = () => (
    <div>
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  failureRender = () => (
    <div className="failureJobfetchContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">We cannot fing what you are looking for</p>
      <button type="button" className="failureBtn">
        Retry
      </button>
    </div>
  )

  renderToShowResult = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case initialStatus.progress:
        return this.progressRender()
      case initialStatus.success:
        return this.successRender()
      case initialStatus.failure:
        return this.failureRender()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderToShowResult()}</div>
  }
}

export default JobItemsDetails
