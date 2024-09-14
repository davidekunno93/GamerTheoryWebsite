import { useContext, useLayoutEffect, useRef, useState } from 'react';
import './productpage.scoped.css'
import { DataContext } from '../../Context/DataProvider';
import RatingOnly from '../../Components/RatingsDisplay/RatingOnly';
import Dropdown from '../../Components/Dropdown/Dropdown';
import ProductSlider from '../../Components/ProductSlider/ProductSlider';
import { itemObject, ProductPageProps } from '../../types';
import { Link } from 'react-router-dom';
import ReviewsBreakdown from '../../Components/ReviewsBreakdown/ReviewsBreakdown';

type ConsoleDropdown = {
    isOpen: boolean
    selectedItem: string
    itemsList: itemObject[]
};

const ProductPage = ({ product }: ProductPageProps) => {
    const { gIcon, testGameProduct2, isVowel } = useContext(DataContext);
    if (!product) {
        product = testGameProduct2;
    };


    // img reel code
    const imgReelWindowRef = useRef<HTMLDivElement>(null);
    const imgReelInnerRef = useRef<HTMLDivElement>(null);
    const [imgReelControls, setImgReelControls] = useState({
        offset: 0,
        maxOffset: 0,
        windowHeight: 0,
        scrollHeight: 0,
    });
    const imgReelFunctions = {
        intitializeControls: function () {
            let imgReelControlsCopy = { ...imgReelControls };
            let maxOffset: number = 0;
            let windowHeight: number | null = null;
            let scrollHeight: number | null = null;
            if (imgReelWindowRef.current) {
                windowHeight = imgReelWindowRef.current.clientHeight;
                imgReelControlsCopy.windowHeight = windowHeight;
            };
            if (imgReelInnerRef.current) {
                scrollHeight = imgReelInnerRef.current.scrollHeight;
                imgReelControlsCopy.scrollHeight = scrollHeight;
            };
            if (windowHeight && scrollHeight) {
                maxOffset = scrollHeight - windowHeight;
                imgReelControlsCopy.maxOffset = maxOffset;
            };
            setImgReelControls(imgReelControlsCopy);
        },
        pushDown: function () {
            let imgReelControlsCopy = { ...imgReelControls };
            let maxOffset = imgReelControlsCopy.maxOffset;
            if (imgReelControlsCopy.offset < maxOffset - 160) {
                imgReelControlsCopy.offset += 160;
            } else {
                imgReelControlsCopy.offset = maxOffset;
            };
            setImgReelControls(imgReelControlsCopy);
        },
        pushUp: function () {
            let imgReelControlsCopy = { ...imgReelControls };
            if (imgReelControlsCopy.offset > 160) {
                imgReelControlsCopy.offset -= 160;
            } else {
                imgReelControlsCopy.offset = 0;
            };
            setImgReelControls(imgReelControlsCopy);
        },
        selectImg: function (imgUrl: string) {
            setImgSelected(imgUrl);
        },
    };
    useLayoutEffect(() => {
        imgReelFunctions.intitializeControls();
        window.scrollTo(0, 0);
        console.log(product);
    }, []);
    const [imgSelected, setImgSelected] = useState<string>(product.imgReel[0]);


    // dropdown code
    const consoleDropdownPointerRef = useRef<HTMLDivElement>(null);
    const consoleDropdownFunctions = {
        open: function () {
            setConsoleDropdown({ ...consoleDropdown, isOpen: true });
        },
        close: function () {
            setConsoleDropdown({ ...consoleDropdown, isOpen: false });
        },
        toggle: function () {
            if (consoleDropdown.itemsList.length > 0 || consoleDropdown.isOpen) {
                setConsoleDropdown({ ...consoleDropdown, isOpen: !consoleDropdown.isOpen });
            };
        },
        selectItem: function (itemName: string) {
            setConsoleDropdown({ ...consoleDropdown, selectedItem: itemName });
        },
    };
    const toConsoleItemList = (consolesArr: string[]) => {
        let itemsList = [];
        for (let i = 0; i < consolesArr.length; i++) {
            let consoleName = consolesArr[i];
            let item = {
                itemName: consoleName,
                clickFunction: {
                    function: consoleDropdownFunctions.selectItem,
                    params: [consoleName],
                },
            };
            itemsList.push(item);
        };
        return itemsList;
    };
    const [consoleDropdown, setConsoleDropdown] = useState<ConsoleDropdown>({
        isOpen: false,
        selectedItem: product.productType === "video-game" ? product.onConsole : "",
        itemsList: product.productType === "video-game" ? toConsoleItemList(product.consoles) : [],
    });

    const suggestedProducts = [
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
        {
            name: "Grand Theft Auto V",
            background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
            genres: [
                {
                    id: 4,
                    name: "Action",
                }
            ],
            rating: 4.47,
            ratings_count: 6860,
            platforms: [
                {
                    id: 4,
                    name: "PC",
                    slug: "pc",
                },
                {
                    id: 18,
                    name: "PlayStation 4",
                    slug: "playstation4",
                },
                {
                    id: 187,
                    name: "PlayStation 5",
                    slug: "playstation5",
                },
                {
                    id: 7,
                    name: "Nintendo",
                    slug: "nintendo",
                },
            ],
            price: "$59.99",
            favorite: false,
        },
    ];

    return (
        <>
            <div className="product-page">
                <div className="breadcrumbs-section">
                    Video Games &bull; Playstation Games
                </div>
                <div className="product-showcase">
                    <div className="img-reel">

                        <button onClick={() => imgReelFunctions.pushUp()} className="push-up" data-hidden={imgReelControls.offset === 0 ? true : false}>
                            <span className={gIcon}>keyboard_arrow_up</span>
                        </button>
                        <button onClick={() => imgReelFunctions.pushDown()} className="push-down" data-hidden={imgReelControls.offset >= imgReelControls.maxOffset ? true : false}>
                            <span className={gIcon}>keyboard_arrow_down</span>
                        </button>
                        <div ref={imgReelWindowRef} className="window">
                            <div ref={imgReelInnerRef} className="inner" style={{ transform: `translateY(-${imgReelControls.offset}px)` }}>
                                {product.imgReel.map((imgUrl, index) => {
                                    return <div key={index} className="imgDiv">
                                        <img
                                            onClick={() => imgReelFunctions.selectImg(imgUrl)}
                                            src={imgUrl}
                                            alt=""
                                        />
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                    <div className="img-selectedDiv">
                        <img src={imgSelected} alt="" />
                    </div>
                    <div className="product-info">
                        <div className="head">
                            {product.productType === "video-game" ?
                                <div className="developers-and-rating">
                                    <div className="developer">{product.gameDeveloper}</div>
                                    <RatingOnly
                                        rating={product.rating}
                                        ratingsCount={product.ratings_count}
                                    />
                                </div>
                                :
                                <div className="creator">{product.productMake}</div>
                            }
                            <div className="title">{product.name}</div>
                            {product.productType === "video-game" &&
                                <>
                                    <div className="esrb-rating"><b>ESRB Rating:</b> {product.esrb_rating}</div>
                                    <div className="metacritic-rating">
                                        <img src="https://i.imgur.com/zwmEhq8.png" alt="" />
                                        <Link to={product.metacritic_url} target="_blank" className="metacritic-link"><p>Metacritic score:</p></Link>
                                        <span className='purple-text'>94</span>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="price">{product.price}</div>
                        <button className="cartBtn">
                            <span className={gIcon}>shopping_cart</span>
                            <p>Add to Cart</p>
                        </button>
                        <button className="favBtn">
                            <span className={gIcon}>favorite</span>
                            <p>Add to Favorites</p>
                        </button>
                        {product.productType === "video-game" &&
                            <div ref={consoleDropdownPointerRef} onClick={() => consoleDropdownFunctions.toggle()} className="platform-selector">
                                <div className="text">
                                    <p className="label">Console</p>
                                    <p className='console'>{consoleDropdown.selectedItem}</p>
                                </div>
                                <span className={gIcon} data-hidden={consoleDropdown.itemsList.length === 0}>keyboard_arrow_down</span>
                                <Dropdown
                                    open={consoleDropdown.isOpen}
                                    itemsList={consoleDropdown.itemsList}
                                    fontSize={16}
                                    pointerRef={consoleDropdownPointerRef}
                                    onClose={() => consoleDropdownFunctions.close()}
                                />
                            </div>
                        }
                        <div className="condition-info">
                            <p>Condition: <strong>New</strong></p>
                        </div>
                        {product.productType === "video-game" &&
                            <div className="description">
                                <h3 className='m-0'>Summary</h3>
                                <p>
                                    {product.name} is {isVowel(product.genres[0].name.charAt(0)) ? "an" : "a" } {product.genres[0].name.toLowerCase()} game on the {product.onConsole} created by {product.gameDeveloper}. It's playtime is approximately {product.playtime} hours according to users who have completed it.
                                </p>
                            </div>
                        }
                    </div>
                </div>
                {product.productType === "video-game" &&
                    <div className="description-and-reviews">
                        <ReviewsBreakdown product={product} />
                        <div className="description">
                            <h3 className='m-0'>Description</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                }
                <div className="similar-products-container">
                    <h2 className='more-like-this'>Shop similar products...</h2>
                    <ProductSlider
                        products={suggestedProducts}
                        productType='video-game'
                        consoleName='ps5'
                        darkCard={true}
                    />
                </div>
            </div>
        </>
    )
}
export default ProductPage;