import { Link } from 'react-router-dom'
import HeroSection from '../../Components/HeroSection/HeroSection'
import './dashboard.scoped.css'


export const Dashboard = () => {

  const consoleFranchises = [
    {
      franchiseName: "playstation",
      bannerUrl: "https://i.imgur.com/JkvRLyr.png",
      pageLink: "/console/playstation",
    },
    {
      franchiseName: "xbox",
      bannerUrl: "https://i.imgur.com/JjwIUgY.jpg",
      pageLink: "/console/xbox"
    },
    {
      franchiseName: "nintendo",
      bannerUrl: "https://i.imgur.com/qkGNylI.jpg",
      pageLink: "/console/nintendo"
    },
    {
      franchiseName: "pokemon",
      bannerUrl: "https://i.imgur.com/4w9gB0E.jpg",
      pageLink: ""
    },
  ];

  const bannerObjects = [
    {
      title: "Assassin's Creed: Shadows",
      imgUrl: "https://i.imgur.com/LliWGsr.png",
      text: "Shop the latest and greatest video games of all genres",
      btnText: "Shop Now",
      link: "",
    },
    {
      // title: "Call of Duty: Black Ops 6",
      imgUrl: "https://i.imgur.com/7Ro7SCi.jpg",
      // text: "Shop the latest and greatest video games of all genres",
      btnText: "Shop Call of Duty: Black Ops 6",
      link: "",
    },
    {
      title: "Playstation Exclusives",
      imgUrl: "https://i.imgur.com/mzBN0cS.jpg",
      text: "Browse hot deals on the newest playstation exlusive video games",
      btnText: "Shop Now",
      link: "/console/playstation",
    },
    {
      title: "Forza Horizon 5",
      imgUrl: "https://i.imgur.com/MiC1pkn.png",
      text: "Shop the latest and greatest video games of all genres",
      btnText: "Shop Now",
      link: "",
    },
    {
      title: "NEW! Pokemon Cards",
      imgUrl: "https://i.imgur.com/nwic8WC.png",
      text: "Get your favorite Pokemon cards while they're still in stock!",
      btnText: "Browse Cards",
      link: "",
    },
  ];

  return (
    <>
      <HeroSection bannerObjects={bannerObjects} />

      <div className="gray-bg shop-everything">
        <h1 className='center-text dark-text m-0'>Shop Everything. <span className='lightgray-text'>Choose your console...</span></h1>
      </div>

      {consoleFranchises.map((franchise, index) => {
        let isEven = (index + 1) % 2 === 0
        return <div key={index} className={`section ${isEven ? "even" : "odd"}`}>
          <div className="bannerDiv">
            <Link to={franchise.pageLink}><div className="banner" style={{ backgroundImage: `url(${franchise.bannerUrl})` }}>
              <div className="see-more-link">
                <p>VIEW PRODUCTS</p>
              </div>
            </div></Link>
          </div>
        </div>
      })}

    </>
  )
}
export default Dashboard;