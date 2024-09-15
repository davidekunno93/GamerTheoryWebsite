import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './productpage.scoped.css'
import { DataContext } from '../../Context/DataProvider';
import RatingOnly from '../../Components/RatingsDisplay/RatingOnly';
import Dropdown from '../../Components/Dropdown/Dropdown';
import ProductSlider from '../../Components/ProductSlider/ProductSlider';
import { ConsoleName, Product, ProductPageProps } from '../../types';
import { Link } from 'react-router-dom';
import ReviewsBreakdown from '../../Components/ReviewsBreakdown/ReviewsBreakdown';
import dompurify from 'dompurify';
import Loading from '../../Components/Loader/Loading';



const ProductPage = ({ product }: ProductPageProps) => {
    const { gIcon, testGameProduct2, isVowel, textFunctions, getGames, consolesLibrary } = useContext(DataContext);
    const sanitizer = dompurify.sanitize;
    if (!product) {
        product = testGameProduct2;
    };

    // product page setup
    const [productState, setProductState] = useState<Product>(product);
    const initializeProductPage = () => {
        setProductState(product);
        setImgSelected(product.imgReel[0]);
        window.scrollTo(0, 0);
        imgReelFunctions.intitializeControls();
    };
    useLayoutEffect(() => {
        initializeProductPage();
    }, [product]);


    // img reel code
    const [imgSelected, setImgSelected] = useState<string>(productState.imgReel[0]);
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


    // img maginification on mouse hover code
    const selectedImgRef = useRef<HTMLImageElement>(null);
    const maginifyImage = {
        mouseHover: function (e: any) {
            const image = selectedImgRef.current;
            if (!image) return;

            const containerRect = e.target.getBoundingClientRect();
            const x = e.clientX - (containerRect.left + image.offsetLeft);
            const y = e.clientY - (containerRect.top + image.offsetTop);

            image.style.transformOrigin = `${x}px ${y}px`;
            image.style.transform = `scale(2.5)`;
        },
        mouseLeave: function () {
            const image = selectedImgRef.current;
            if (!image) return;

            image.style.transformOrigin = `center center`;
            image.style.transform = `scale(1)`;
        },
    };

    // console dropdown code
    const consoleDropdownPointerRef = useRef<HTMLDivElement>(null);
    const [consoleDropdownOpen, setConsoleDropdownOpen] = useState(false);
    const consoleDropdownSelectItem = (itemName: ConsoleName) => {
        if (productState.productType !== "video-game") return;
        setProductState({ ...productState, onConsole: itemName });
    };




    // get suggested products code
    const [suggestedProducts, setSuggestedProducts] = useState({
        isLoaded: false, // set to true when data is loaded
        products: [testGameProduct2, testGameProduct2, testGameProduct2, testGameProduct2],
        count: 4,
    });
    const loadData = async () => {
        // pass thru platform and genre
        if (productState.productType !== "video-game") return;
        console.log(productState.onConsole, productState.genre);
        const gameData = await getGames([productState.onConsole], 1, productState.genre);
        setSuggestedProducts({ ...suggestedProducts, products: gameData.games, isLoaded: true, count: gameData.games.length });
    };
    useEffect(() => {
        if (productState.productType === "video-game") {
            loadData();
        } else if (productState.productType === "console") {
            setSuggestedProducts({ ...suggestedProducts, products: consolesLibrary[productState.platform].consoleProducts, isLoaded: true });
        };
    }, [productState.productType === "video-game" ? productState.onConsole : null]);


    // helper functions
    const prettifyDescription = (description: string): string => {
        if (description.includes("Español")) {
            let englishDescription = description.split("Español")[0];
            let spanishDescription = description.split("Español")[1];
            return "<p>" + englishDescription + "</p><p>" + "<br /><b>Español</b><br />" + spanishDescription + "</p>";
        } else {
            return "<p>" + description + "</p>";
        };
    };
    const toConsoleItemList = (consolesArr: string[]) => {
        let itemsList = [];
        for (let i = 0; i < consolesArr.length; i++) {
            let consoleName = consolesArr[i];
            let item = {
                itemName: consoleName,
                clickFunction: {
                    // function: consoleDropdownFunctions.selectItem,
                    function: consoleDropdownSelectItem,
                    params: [consoleName],
                },
            };
            itemsList.push(item);
        };
        return itemsList;
    };




    return (
        <>
            <div className="product-page">
                <div className="breadcrumbs-section">
                    <div className="breadcrumbs">
                        {productState.productType === "video-game" &&
                            <Link to={`/console/${productState.onConsole.split(" ")[0].toLowerCase()}`} state={{ disposition: "video-games" }}>
                                <p>{productState.onConsole.split(" ")[0]} Games</p>
                            </Link>
                        }
                        {productState.productType === "console" &&
                            <Link to={`/console/${productState.platform}`} state={{ disposition: "console" }}>
                                <p>{textFunctions.capitalize(productState.platform)} Console</p>
                            </Link>
                        }
                        <span className={gIcon}>chevron_right</span>
                        <p className='current-crumb'>{product.name}</p>
                    </div>
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
                        <div className="hover-glass"
                            onMouseMove={maginifyImage.mouseHover}
                            onMouseLeave={() => maginifyImage.mouseLeave()}
                        />
                        <img ref={selectedImgRef} src={imgSelected} alt="" />
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
                                        {product.metacritic_url ?
                                            <Link to={product.metacritic_url} target="_blank" className="metacritic-link"><p>Metacritic score:</p></Link>
                                            :
                                            <p>Metacritic score:</p>
                                        }
                                        <span className='purple-text'>94</span>
                                    </div>
                                    {product.bestseller &&
                                        <div className="bestseller">
                                            <span className={gIcon}>local_fire_department</span>
                                            <p>Bestseller</p>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                        {productState.productType === "video-game" && productState.sale ?
                            <div className="price">
                                <p className='before'>{product.price}</p>
                                <p className='after'>$44.99</p>
                            </div>
                            :
                            <div className="price">{product.price}</div>
                        }
                        <button className="cartBtn">
                            <span className={gIcon}>shopping_cart</span>
                            <p>Add to Cart</p>
                        </button>
                        <button className="favBtn">
                            <span className={gIcon}>favorite</span>
                            <p>Add to Favorites</p>
                        </button>
                        {productState.productType === "video-game" &&
                            <div ref={consoleDropdownPointerRef} onClick={() => setConsoleDropdownOpen(!consoleDropdownOpen)} className="platform-selector">
                                <div className="text">
                                    <p className="label">Console</p>
                                    <p className='console'>{productState.onConsole}</p>
                                    {/* <p className='console'>{consoleDropdown.selectedItem}</p> */}
                                </div>
                                <span className={gIcon} data-hidden={productState.consoles.length === 0}>keyboard_arrow_down</span>
                                <Dropdown
                                    open={consoleDropdownOpen}
                                    itemsList={toConsoleItemList(productState.consoles)}
                                    // itemsList={consoleDropdown.itemsList}
                                    fontSize={16}
                                    pointerRef={consoleDropdownPointerRef}
                                    onClose={() => setConsoleDropdownOpen(false)}
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
                                    {product.name} is {isVowel(product.genres[0].name.charAt(0)) ? "an" : "a"} {product.genres[0].name.toLowerCase()} game on the {product.onConsole} created by {product.gameDeveloper}. It's playtime is approximately {product.playtime} hours according to users who have completed it.
                                </p>
                            </div>
                        }
                    </div>
                </div>
                {product.productType === "video-game" &&
                    <div className="description-and-reviews">
                        <ReviewsBreakdown product={product} />
                        {product.description &&
                            <div className="description">
                                <h3 className='m-0'>Description</h3>
                                {/* <p>{product.description}</p> */}
                                <div dangerouslySetInnerHTML={{ __html: sanitizer(prettifyDescription(product.description)) }} />
                            </div>
                        }
                    </div>
                }
                <div className="similar-products-container">
                    <Loading
                        open={!suggestedProducts.isLoaded}
                        closureDelay={800}
                        overlayFillType="fillElement"
                        loaderPosition="absolute"
                    />
                    <h2 className='more-like-this'>Shop similar products...</h2>
                    {suggestedProducts.isLoaded && suggestedProducts.products.length > 0 &&
                        <ProductSlider
                            products={suggestedProducts.products}
                            productType={productState.productType}
                            consoleName={productState.productType === "video-game" ? productState.onConsole : undefined}
                            darkCard={true}
                            gap={16}
                            excludedProducts={[productState.name]}
                        />
                    }
                </div>
            </div>
        </>
    )
}
export default ProductPage;