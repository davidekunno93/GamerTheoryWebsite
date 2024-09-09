import { useEffect, useState } from 'react'
import './herosection.scoped.css'
import { HeroSectionProps } from '../../types';
import { Link } from 'react-router-dom';


const HeroSection = ({ bannerObjects, bottomGradient }: HeroSectionProps) => {

    let changeIndexTimeout: number | undefined = undefined;
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    useEffect(() => {
        if (activeIndex === -1) {
            setActiveIndex(0);
        }
        changeIndexTimeout = setTimeout(incrementActiveIndex, 8000);
        return () => clearTimeout(changeIndexTimeout);
    }, [activeIndex]);
    const incrementActiveIndex = () => {
        if (activeIndex < bannerObjects.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else {
            setActiveIndex(0);
        }
    };

    return (
        <div className="hero-section">
            {bottomGradient &&
                <div className="gradient-box"></div>
            }
            <div className="dot-indicators">
                {bannerObjects.map((dot, index: number) => {
                    return <div key={index} onClick={() => setActiveIndex(index)} className={`${dot} dot ${activeIndex === index ? "selected" : "unselected"}`}>
                        <div className="beam"></div>
                    </div>
                })}
            </div>
            <div className="inner" style={{ transform: `translateX(-${activeIndex === -1 ? "0" : activeIndex * 100}%)` }}>
                {bannerObjects.map((banner, index) => {
                    return <div key={index} className="carousel-item-top position-relative">
                        <img src={banner.imgUrl} alt="" className="hero-img" style={{ objectPosition: banner.objectPosition ?? "" }} />
                        <Link to={banner.link}><button className="hero-btn">{banner.btnText}</button></Link>
                        <div className="caption">
                            <p className='title'>{banner.title ?? ""}</p>
                            <p className='text'>{banner.text ?? ""}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default HeroSection;