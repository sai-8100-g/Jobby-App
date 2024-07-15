import {MdLocationOn, MdStar} from 'react-icons/md'
import {FaBusinessTime} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const JobSection = props => {
  const {data} = props
  const {
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    employmentType,
    companyLogoUrl,
    id,
  } = data
  return (
    <Link className="jobsLink" to={`/jobs/${id}`}>
      <li className="job-list-item-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="companyLogo"
          />
          <div>
            <h1>{title}</h1>
            <div className="star-rating-container">
              <MdStar className="icons star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="icons" />
              <p>{location}</p>
            </div>
            <div className="type-container">
              <FaBusinessTime className="icons" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobSection
