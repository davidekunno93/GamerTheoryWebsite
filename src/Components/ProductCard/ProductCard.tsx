import { useContext } from 'react';
import { ObjectWithStringValues, ProductCardProps } from '../../types';
import RatingsDisplay from '../RatingsDisplay/RatingsDisplay';
import './productcard.scoped.css'
import { DataContext } from '../../Context/DataProvider';




const ProductCard = (props: ProductCardProps) => {
    const { gIcon, productPageFunctions } = useContext(DataContext);
    const platformConsoleStrip: ObjectWithStringValues = {
        ps5: "https://i.imgur.com/AXD5Q3th.jpg",
        "PlayStation 5": "https://i.imgur.com/AXD5Q3th.jpg",
        "PlayStation 4": "https://i.imgur.com/kJpLSp2.jpg",
        "Xbox Series X": "https://i.imgur.com/hzydxqj.jpg",
        "Xbox One": "https://i.imgur.com/Ytm0VIW.jpg",
        "Nintendo Switch": "https://i.imgur.com/wEIvg7V.png",
    };

    return (
        <div key={props.index} className="product-card-container">
            {props.productType === "console" &&
                <div className="product-card" data-cardversion="console" data-darkcard={props.darkCard ?? false}>
                    <div onClick={() => productPageFunctions.viewProduct(props.console)} className="imgDiv">
                        <img src={props.console.imgUrl} alt="" className="console-img" />
                    </div>
                    <div className="head">
                        <p className="sub-title">{props.console.productMake}</p>
                        <p className="title">{props.console.name}</p>
                    </div>
                    <div className="footer">
                        <div className="price">{props.console.price}</div>
                        <button className="addBtn">Add to cart</button>
                    </div>
                </div>
            }
            {props.productType === "video-game" &&
                <div className="product-card" data-cardversion="video-game" data-darkcard={props.darkCard ?? false}>
                    <div onClick={() => productPageFunctions.viewProduct(props.game, props.consoleName)} className="imgDiv">
                        {props.consoleName &&
                            <img src={platformConsoleStrip[props.consoleName]} alt="" className="console-strip" />
                        }
                        <div className="video-game-img-container">
                            <img
                                src={props.game.background_image}
                                alt=""
                                className="video-game-img"
                            />
                        </div>
                    </div>
                    <div className="head">
                        <p className="sub-title">{props.game.genre}</p>
                        <p className="title truncated">{props.game.name}</p>
                        <RatingsDisplay
                            game={props.game}
                        />
                    </div>
                    <div className="footer">
                        <div className="price-and-favorite">
                            {props.game.sale ?
                                <div className="price">
                                    <p className="before">{props.game.price}</p>
                                    <p className="after">$44.99</p>
                                </div>
                                :
                                <div className="price">$69.99</div>
                            }
                            <div className="favorite-container">
                                {props.game.favorite ?
                                    <img src="https://i.imgur.com/8CwUhbi.png" alt="" className="favorite-img" />
                                    :
                                    <span className={`${gIcon} favorite-empty`}>favorite</span>
                                }
                            </div>
                        </div>
                        <button className="addBtn">Add to cart</button>
                    </div>
                </div>
            }
        </div>
    )
}
export default ProductCard;
