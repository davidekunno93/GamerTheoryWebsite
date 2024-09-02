import { useContext, useEffect, useRef, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import './consolepage.scoped.css'
import { DataContext } from "../../Context/DataProvider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Dropdown from "../../Components/Dropdown/Dropdown";

const ConsolePage = () => {
    const { gIcon, getGames } = useContext(DataContext);
    const bannerObjects = [
        {
            // title: "",
            imgUrl: "https://i.imgur.com/r4K98Bv.jpg",
            // text: null,
            btnText: "Buy FC24",
            link: "",
        },
        {
            title: "God of War Ragnarok",
            imgUrl: "https://i.imgur.com/YA9kNGf.jpg",
            text: "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives",
            btnText: "Buy God of War Ragnarok",
            link: "",
            // objectPosition: "top",
        },
        {
            title: "The Last of Us: Part II",
            imgUrl: "https://i.imgur.com/nYW0CWK.jpg",
            text: "Ellie embarks on another journey through a post-apocalyptic America on a mission of vengeance against a mysterious militia.",
            btnText: "Buy The Last of Us: Part II",
            link: "",
            objectPosition: "left",
        },
        {
            // title: null,
            imgUrl: "https://i.imgur.com/6hdiCyN.png",
            // text: null,
            btnText: "Buy Ratchet & Clank Rift Apart",
            link: "",
            objectPosition: "left",
        },
        {
            title: "PS5 Disc Edition vs Digital Edition",
            imgUrl: "https://i.imgur.com/n4wIsEh.jpg",
            text: "With a disc-drive PS5, games can be installed from physical discs or via digital downloads. However, the digital-edition PS5 is digital downloads only",
            btnText: "Buy Sony Playstation 5",
            link: "",
        },

    ];
    const consoleProducts = [
        {
            productMake: "Sony Interactive Entertainment",
            productName: "Playstation 5 Slim Disc Edition",
            price: "$499.99",
            imgUrl: "https://i.imgur.com/JOF0w0U.png",
            link: "",
        },
        {
            productMake: "Sony Interactive Entertainment",
            productName: "Playstation 5 Slim Digital Edition",
            price: "$449.99",
            imgUrl: "https://i.imgur.com/aJcmSy3.jpg",
            link: "",
        },
        {
            productMake: "Sony Interactive Entertainment",
            productName: "Playstation 4 Pro 1TB",
            price: "$299.99",
            imgUrl: "https://i.imgur.com/LcskKrm.png",
            link: "",
        },
        {
            productMake: "Sony Interactive Entertainment",
            productName: "Playstation 4 Slim 500GB",
            price: "$279.99",
            imgUrl: "https://i.imgur.com/wPN1D2d.png",
            link: "",
        },
    ];




    useEffect(() => {
        // getGames(["ps5"]);
        // console.log(platformToPlatformId(["playstation4", "ps5", "xboxone", "xboxseriesx", "nintendo", "pc"]));
        // console.log(renderRating(testGameObject.rating))
    }, []);






    // test data
    const testGameObject = {
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
    };
    const [videoGames, setVideoGames] = useState<any>([
        testGameObject
    ]);

    const filterOptionsPointerRefs = useRef<HTMLDivElement[]>([]);
    const filterOptionsInputRefs = useRef<HTMLParagraphElement[]>([]);
    const filterOptionsDropdownFunctions = {
        open: function (index: number) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[index].dropdown.open = true;
            setFilterOptions(filterOptionsCopy);
        },
        close: function (index: number) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[index].dropdown.open = false;
            setFilterOptions(filterOptionsCopy);
        },
        toggle: function (index: number) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[index].dropdown.open = !filterOptionsCopy[index].dropdown.open;
            setFilterOptions(filterOptionsCopy);
        },
        selectItem: function (selectedItem: string, index: number) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[index].dropdown.selectedItem = selectedItem;
            setFilterOptions(filterOptionsCopy);
        }
    };
    const [filterOptions, setFilterOptions] = useState([
        {
            label: "Console",
            inputRef: "",
            dropdown: {
                open: false,
                selectedItem: "PS5",
                itemsList: [
                    {
                        itemName: "PS5",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["PS5", 0],
                        },
                    },
                    {
                        itemName: "PS4",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["PS4", 0],
                        },
                    }
                ],
            }
        },
        {
            label: "Genre",
            inputRef: "",
            width: "62px",
            dropdown: {
                open: false,
                selectedItem: "All",
                itemsList: [
                    {
                        itemName: "All",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["All", 1],
                        },
                    },
                    {
                        itemName: "Action",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Action", 1],
                        },
                    },
                    {
                        itemName: "Adventure",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Adventure", 1],
                        },
                    },
                    {
                        itemName: "Fighting",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Fighting", 1],
                        },
                    },
                    {
                        itemName: "Indie",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Indie", 1],
                        },
                    },
                    {
                        itemName: "Platformer",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Platformer", 1],
                        },
                    },
                    {
                        itemName: "Puzzle",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Puzzle", 1],
                        },
                    },
                    {
                        itemName: "RPG",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["RPG", 1],
                        },
                    },
                    {
                        itemName: "Shooter",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["Shooter", 1],
                        },
                    },
                ],
            }
        },
        {
            label: "Min. Rating",
            inputRef: "",
            dropdown: {
                open: false,
                selectedItem: "star: 4",
                itemsList: [
                    {
                        itemName: "star: 1",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["star: 1", 2],
                        },
                    },
                    {
                        itemName: "star: 2",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["star: 2", 2],
                        },
                    },
                    {
                        itemName: "star: 3",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["star: 3", 2],
                        },
                    },
                    {
                        itemName: "star: 4",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["star: 4", 2],
                        },
                    },
                ],
            }
        },
    ]);




    return (
        <>
            {/* banner */}
            <HeroSection
                bannerObjects={bannerObjects}
                bottomGradient
            />
            {/* console/hardware slide */}
            <div className="section column whitesmoke">
                <h1 className="heading">Consoles</h1>
                <div className="product-slider">
                    {consoleProducts.map((console, index) => {
                        return <ProductCard
                            index={index}
                            productType="console"
                            console={console}
                        />
                    })}

                </div>
            </div>

            {/* shop video games/accessories */}
            <div className="section column">
                <h1 className="heading">
                    Playstation Games
                </h1>
                <div className="filter-options">
                    {filterOptions.map((option, index) => {
                        return <div key={index} className="filter-option">
                            <label htmlFor={`option-dropper`}>{option.label}</label>
                            <div ref={(e: HTMLDivElement) => filterOptionsPointerRefs.current[index] = e} onClick={() => filterOptionsDropdownFunctions.toggle(index)} id={`option-dropper`} className="option-dropper" style={{ width: option.width ?? "" }}>
                                <p ref={(e: any) => filterOptionsInputRefs.current[index] = e}>{filterOptions[index].dropdown.selectedItem}</p>
                                <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                                <Dropdown
                                    open={option.dropdown.open}
                                    itemsList={option.dropdown.itemsList}
                                    pointerRefCurrent={filterOptionsPointerRefs.current[index]}
                                    onClose={() => filterOptionsDropdownFunctions.close(index)}
                                />
                            </div>
                        </div>
                    })}
                    <div className="filter-option">
                        <label htmlFor={`option-dropper`}>Price Range</label>
                        <div id={`option-dropper`} className="option-dropper">
                            <p>$ ...</p>
                            <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                        </div>
                    </div>
                </div>
                <div className="products-section">
                    {videoGames.map((game: any, index: number) => {
                        return <ProductCard
                            index={index}
                            productType="video-game"
                            game={game}
                            platform="ps5"
                        />
                    })}
                </div>
            </div>
        </>
    )
}
export default ConsolePage;