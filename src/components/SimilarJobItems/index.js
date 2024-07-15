import {MdLocationOn, MdStar} from 'react-icons/md'
import {FaBusinessTime} from 'react-icons/fa'

import './index.css'

const SimilarJobItems = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = data
  return (
    <li className="similarJobsListItems">
      <div className="logoTitleContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similarJobLogo"
        />
        <div>
          <h1 className="similarJobHeading">{title}</h1>
          <div className="ratingStarContainer">
            <MdStar className="similarJobIcon star" />
            <p className="similarJobPara">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similarJobDescriptionContainer">
        <h1 className="similarJobHeading">Description</h1>
        <p className="similarJobPara">{jobDescription}</p>
      </div>
      <div className="similarJoblocationTypeContainer">
        <div className="similarJobLocationContainer">
          <MdLocationOn className="similarJobIcon" />
          <p className="similarJobPara">{location}</p>
        </div>
        <div className="similarJobTypeContainer">
          <FaBusinessTime className="similarJobIcon" />
          <p className="similarJobPara">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItems
