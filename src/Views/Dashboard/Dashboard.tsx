import HeroSection from '../../Components/HeroSection/HeroSection'
import './dashboard.scoped.css'


export const Dashboard = () => {

  const consoleFranchises = [
    {
      franchiseName: "playstation",
      bannerUrl: "https://i.imgur.com/JkvRLyr.png",
      pageLink: "",
    },
    {
      franchiseName: "xbox",
      bannerUrl: "https://i.imgur.com/JjwIUgY.jpg",
      pageLink: ""
    },
    {
      franchiseName: "nintendo",
      bannerUrl: "https://i.imgur.com/qkGNylI.jpg",
      pageLink: ""
    },
    {
      franchiseName: "pokemon",
      bannerUrl: "https://i.imgur.com/4w9gB0E.jpg",
      pageLink: ""
    },
  ]

  const banners = [
    {
      title: "Playstation Exclusives",
      imgUrl: "https://i.imgur.com/mzBN0cS.jpg",
      text: "Browse hot deals on the newest playstation exlusive video games",
      btnText: "Shop Now",
      link: "",
    },
    {
      title: "Xbox Video Games",
      imgUrl: "https://i.imgur.com/bOVq5EY.jpg",
      text: "Shop deals for Xbox video games of all genres",
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
  ]

  return (
    <>
      <HeroSection banners={banners} />

      <div className="gray-bg shop-everything">
        <h1 className='center-text dark-text m-0'>Shop Everything. <span className='lightgray-text'>Choose your console...</span></h1>
      </div>
      {consoleFranchises.map((franchise, index) => {
        let isEven = (index + 1) % 2 === 0
        return <div className={`section ${isEven ? "even" : "odd"}`}>
          <div className="bannerDiv">
            <div className="banner" style={{ backgroundImage: `url(${franchise.bannerUrl})` }}>
              <div className="see-more-link">
                <p>VIEW PRODUCTS</p>
              </div>
            </div>
          </div>
        </div>
      })}



    </>
  )
}
export default Dashboard;