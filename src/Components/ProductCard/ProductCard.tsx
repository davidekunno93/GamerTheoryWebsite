import { useContext } from 'react';
import { GenreObject, ObjectWithStringValues, PlatformObject } from '../../types';
import RatingsDisplay from '../RatingsDisplay/RatingsDisplay';
import './productcard.scoped.css'
import { DataContext } from '../../Context/DataProvider';

type ProductCardProps = {
    index: number
} & (ConsoleCardProps | VideoGameCardProps)

type ConsoleCardProps = {
    productType: "console"
    console: any
}
type VideoGameCardProps = {
    productType: "video-game"
    game: Game
    platform?: string
}
type Game = {
    name: string
    background_image: string
    rating: number
    ratings_count: number
    platforms: PlatformObject[] | string
    genres: GenreObject[] | string
    price?: string
    favorite?: boolean
};


const ProductCard = (props: ProductCardProps) => {
    const { gIcon } = useContext(DataContext);
    const platformConsoleStrip: ObjectWithStringValues = {
        ps5: "https://i.imgur.com/AXD5Q3th.jpg"
    };
    return (
        <div key={props.index} className="product-card-container">
            {props.productType === "console" &&
                <div className="product-card" data-cardVersion="console">
                    <div className="imgDiv">
                        <img src={props.console.imgUrl} alt="" className="img" />
                    </div>
                    <div className="head">
                        <p className="sub-title">{props.console.productMake}</p>
                        <p className="title">{props.console.productName}</p>
                    </div>
                    <div className="footer">
                        <p className="price">{props.console.price}</p>
                        <button className="addBtn">Add to cart</button>
                    </div>
                </div>
            }
            {props.productType === "video-game" &&
                <div className="product-card" data-cardVersion="video-game">
                    <div className="imgDiv">
                        {props.platform &&
                            <img src={platformConsoleStrip[props.platform]} alt="" className="console-strip" />
                        }
                        <img src={props.game.background_image} alt="" className="video-game-img" />
                    </div>
                    <div className="head">
                        <p className="sub-title">{typeof props.game.genres === "string" ? props.game.genres.split(":")[0] : props.game.genres[0].name}</p>
                        <p className="title truncated">{props.game.name}</p>
                        <RatingsDisplay
                            game={props.game}
                        />
                    </div>
                    <div className="footer">
                        <div className="price-and-favorite">
                            <p className="price">$69.99</p>
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
