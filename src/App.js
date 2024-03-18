import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from './components/TravelItem'
import './App.css'

const allAPIStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class App extends Component {
  state = {
    travelGuide: [],
    apiStatus: allAPIStatus.initial,
  }

  componentDidMount() {
    this.getTravelGuidePackagesAPI()
  }

  getTravelGuidePackagesAPI = async () => {
    this.setState({apiStatus: allAPIStatus.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const filteredData = data.packages.map(eachPackage => ({
      id: eachPackage.id,
      name: eachPackage.name,
      imageUrl: eachPackage.image_url,
      description: eachPackage.description,
    }))
    console.log(filteredData)
    this.setState({apiStatus: allAPIStatus.success, travelGuide: filteredData})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
    const {travelGuide} = this.state

    return (
      <ul className="travel-list">
        {travelGuide.map(travelItem => (
          <TravelItem key={travelItem.id} travelDetails={travelItem} />
        ))}
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case allAPIStatus.inProgress:
        return this.renderLoader()
      case allAPIStatus.success:
        return this.renderDetails()
      default:
        return null
    }
  }

  render() {
    const {travelGuide} = this.state
    console.log(travelGuide)
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="style-heading">Travel Guide</h1>
          {this.renderSwitch()}
        </div>
      </div>
    )
  }
}

export default App
