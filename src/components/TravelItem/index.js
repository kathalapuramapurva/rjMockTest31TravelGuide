import './index.css'

const TravelItem = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails
  return (
    <li className="travel-item">
      <img src={imageUrl} alt={name} className="travel-image" />
      <div className="travel-container">
        <h1 className="travel-name">{name}</h1>
        <p className="travel-para">{description}</p>
      </div>
    </li>
  )
}

export default TravelItem
