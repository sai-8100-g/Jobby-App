import './index.css'

const ProfileSection = props => {
  const {data} = props
  const {name, profileImageUrl, shortBio} = data
  return (
    <div className="profileSectionContainer">
      <img src={profileImageUrl} alt="profile" className="profileImg" />
      <h1 className="profileName">{name}</h1>
      <p className="profileBio">{shortBio}</p>
    </div>
  )
}

export default ProfileSection
