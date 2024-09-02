import { useEffect, useState } from 'react';
import './navbar.scoped.css'
import SearchBar from '../SearchBar/SearchBar';
import { NavbarProps } from '../../types';
import { Link } from 'react-router-dom';


const Navbar = ({ setSidePanelOpen }: NavbarProps) => {

  const [subNavbarShown, setSubNavBarShown] = useState<boolean>(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  const handleScroll = () => {
    if (window.scrollY > 120) {
      if (subNavbarShown) {
        setSubNavBarShown(false);
      }
    } else {
      setSubNavBarShown(true);
    }
  }

  const numItems: string = "4+";

  return (
    <>

      <div className="floating-navbar">

        <div className="navbar">
          <div className="left-side">
            <div className="logo-and-menu">
              <div onClick={() => setSidePanelOpen(true)} className="menu-icon">
                <span className="line-1"></span>
                <span className="line-2"></span>
                <span className="line-3"></span>
              </div>
              <Link to='/'>
                <img src="https://i.imgur.com/Hitxk01.png" className="img-logo"></img>
              </Link>
            </div>
            <SearchBar width={350} />
            <p className='weight-700 small mx-5'>Enjoy free shipping on orders of $149.99 or more!</p>

          </div>
          <div className="right-side">
            <div className="option saved-items">
              <div className="icon">
                <span className="material-symbols-outlined">favorite</span>
              </div>
            </div>
            <div className="option cart-checkout">
              <div className="icon">
                <span className="material-symbols-outlined">shopping_cart</span>
                <div className="notification" style={{ width: `${18 + 6 * (numItems.toString().length - 1)}px`, right: `-${4 + 2 * (numItems.toString().length) - 1}px` }}>
                  <p>{numItems}</p>
                </div>
              </div>
            </div>
            <div className="option profile">
              <div className="profile-imgDiv">
                <p>D</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`sub-navbar ${!subNavbarShown && "hidden"}`}>
          <div className="option">
            <p>PLAYSTATION</p>
          </div>
          <div className="option">
            <p>XBOX</p>
          </div>
          <div className="option">
            <p>NINTENDO</p>
          </div>
          <div className="option">
            <p>PC</p>
          </div>
          <div className="option">
            <p>POKEMON CARDS</p>
          </div>
          <div className="option-red">
            <p>SALE</p>
          </div>
        </div>
      </div>
      <div className="navbar-placeholder"></div>
    </>
  )
}
export default Navbar;