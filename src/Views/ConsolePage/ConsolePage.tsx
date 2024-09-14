import { useContext, useEffect, useRef, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import './consolepage.scoped.css'
import { DataContext } from "../../Context/DataProvider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Dropdown from "../../Components/Dropdown/Dropdown";
import RatingOnly from "../../Components/RatingsDisplay/RatingOnly";
import { GameDataOptions, PaginationControlObject } from "../../types";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loader/Loading";

const ConsolePage = () => {
    const { gIcon, textFunctions, testGameProduct, getGames } = useContext(DataContext);

    const { platform } = useParams<any>();
    const consolePageLibrary: any = {
        'playstation': {
            name: 'playstation',
            consoles: ['PlayStation 5', 'PlayStation 4'],
            bannerObjects: [
                {
                    imgUrl: "https://i.imgur.com/r4K98Bv.jpg",
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
                    btnText: "Buy Sony PlayStation 5",
                    link: "",
                },

            ],
            consoleProducts: [
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 5 Slim Disc Edition",
                    price: "$499.99",
                    imgUrl: "https://i.imgur.com/JOF0w0U.png",
                    link: "",
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 5 Slim Digital Edition",
                    price: "$449.99",
                    imgUrl: "https://i.imgur.com/aJcmSy3.jpg",
                    link: "",
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 4 Pro 1TB",
                    price: "$299.99",
                    imgUrl: "https://i.imgur.com/LcskKrm.png",
                    link: "",
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 4 Slim 500GB",
                    price: "$279.99",
                    imgUrl: "https://i.imgur.com/wPN1D2d.png",
                    link: "",
                },
            ],
        },
        'xbox': {
            name: 'xbox',
            consoles: ['Xbox Series X', 'Xbox One'],
            bannerObjects: [
                {
                    imgUrl: "https://i.imgur.com/3AGebBo.png",
                    btnText: "Buy Xbox Series X",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/7Ro7SCi.jpg",
                    btnText: "Buy Call of Duty: Black Ops 6",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/yL2O1oX.jpg",
                    btnText: "Buy Assassin's Creed: Shadows",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/io8qVRR.jpg",
                    btnText: "Buy Forza Horizon 5",
                    title: "Forza Horizon 5",
                    text: "Forza Horizon 5 is a racing video game set in an open world environment based in a fictional representation of Mexico",
                    link: "",
                },
            ],
            consoleProducts: [
                {
                    productMake: "Microsoft",
                    name: "Xbox Series X 1TB",
                    price: "$499.99",
                    imgUrl: "https://i.imgur.com/H65yNiT.png",
                    link: "",
                },
                {
                    productMake: "Microsoft",
                    name: "Xbox One S 1TB",
                    price: "$449.99",
                    imgUrl: "https://i.imgur.com/WVpHH0m.png",
                    link: "",
                },
                {
                    productMake: "Microsoft",
                    name: "Xbox One X 1TB (Renewed)",
                    price: "$154.99",
                    imgUrl: "https://i.imgur.com/X78WguU.png",
                    link: "",
                },
            ],
        },
        'nintendo': {
            name: 'nintendo',
            consoles: ['Nintendo Switch'],
            bannerObjects: [
                {
                    imgUrl: "https://i.imgur.com/ArzkJmo.png",
                    btnText: "Buy Nintendo Switch",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/127AoRN.jpg",
                    btnText: "Buy Mario Kart Deluxe",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/hJMrfb7.jpg",
                    btnText: "Buy Mario Party Superstars",
                    link: "",
                },
                {
                    imgUrl: "https://i.imgur.com/C3ur0D0.png",
                    btnText: "Buy Zelda: Tears of the Kingdom",
                    title: "Zelda: Tears of the Kingdom",
                    text: "Link and Zelda set out to explore the cavern beneath Hyrule Castle",
                    link: "",
                    objectPosition: "top",
                },

            ],
            consoleProducts: [
                {
                    productMake: "Nintendo",
                    name: "Nintendo Switch",
                    price: "$349.99",
                    imgUrl: "https://i.imgur.com/tW11rZ0.png",
                    link: "",
                },
            ],
        },
    };

    // page setting variables
    const bannerObjects = platform ? consolePageLibrary[platform].bannerObjects : null;
    const consoleProducts = platform ? consolePageLibrary[platform].consoleProducts : null;
    const updateFilterOptionsConsoleDropdown = () => {
        if (platform) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[0].dropdown.selectedItem = consolePageLibrary[platform].consoles[0];
            filterOptionsCopy[0].dropdown.selectedItem = consolePageLibrary[platform].consoles[0];
            let itemsList = [];
            let consoleItems = consolePageLibrary[platform].consoles;
            for (let i = 0; i < consoleItems.length; i++) {
                itemsList.push({
                    itemName: consoleItems[i],
                    clickFunction: {
                        function: filterOptionsDropdownFunctions.selectItem,
                        params: [consoleItems[i], 0],
                    }
                });
            };
            filterOptionsCopy[0].dropdown.itemsList = itemsList;
            setFilterOptions(filterOptionsCopy);
        };
    };
    useEffect(() => {
        updateFilterOptionsConsoleDropdown();
    }, [platform]);






    // get video game data
    const [videoGames, setVideoGames] = useState({
        scrollToProducts: false, // set to true when load should scroll to products
        isLoaded: true, // set to true when data is loaded
        isLoadedWithDelay: true,
        games: [testGameProduct],
        count: 1,
        pages: 1
    });
    const productsSectionRef = useRef<HTMLDivElement>(null);
    const scrollToProductsSection = () => {
        console.log("scrolling");
        if (!productsSectionRef.current) return;
        window.scrollTo({
            top: productsSectionRef.current.offsetTop - 48,
            behavior: "smooth"
        });
    };
    useEffect(() => {
        setVideoGames({ ...videoGames, scrollToProducts: true });
    }, []);
    useEffect(() => {
        if (videoGames.scrollToProducts && videoGames.isLoaded) {
            scrollToProductsSection();
        };
    }, [videoGames.isLoaded]);



    const loadData = async (pageNumber?: number, scrollToProducts?: boolean) => {
        setVideoGames({ ...videoGames, isLoaded: false });
        const gameData = await getGames(['PS5'], pageNumber);
        if (pageNumber || scrollToProducts) {
            setVideoGames({ ...gameData, scrollToProducts: true, isLoaded: true });
        } else {
            setVideoGames({ ...gameData, scrollToProducts: false, isLoaded: true });
        };
    };
    useEffect(() => {
        // loadData();
        paginationFunctions.initializePaginationControl(7132);
        // console.log(platformToPlatformId(["playstation4", "ps5", "xboxone", "xboxseriesx", "nintendo", "pc"]));
    }, []);
    const [gameDataOptions, setGameDataOptions] = useState<GameDataOptions>({
        pageSize: 12,
        esrbRating: null,
        platforms: ["PS5"],
        genre: null,
        minRating: null,
    });
    // useEffect(() => {
    //     console.log(gameDataOptions);
    // }, [gameDataOptions.platforms, gameDataOptions.genre, gameDataOptions.minRating]);


    // filter options code
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
            filterFunctions.filterOptionsTransformer(index, selectedItem);
            setFilterOptions(filterOptionsCopy);
        },
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
            width: "56px",
            dropdown: {
                open: false,
                selectedItem: "None",
                itemsList: [
                    {
                        itemName: "None",
                        clickFunction: {
                            function: filterOptionsDropdownFunctions.selectItem,
                            params: ["None", 2],
                        },
                    },
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
    const filterFunctions = {
        filterOptionsTransformer: function (index: number, data: string | null) {
            // if index = 0 - update platforms (string)
            if (index === 0) {
                if (typeof data === 'string') {
                    filterFunctions.updatePlatforms([data]);
                };
            } else if (index === 1) {
                // if index = 1 - update genre (string | null)
                if (typeof data === 'string') {
                    if (data === "All") {
                        filterFunctions.updateGenre(null);
                    } else {
                        filterFunctions.updateGenre(data);
                    };
                };
            } else if (index === 2) {
                // if index = 2 - update min rating (number | null)
                if (typeof data === 'string') {
                    if (data === "None") {
                        filterFunctions.updateMinRating(null);
                    } else {
                        let rating = parseInt(data.split(": ")[1]);
                        filterFunctions.updateMinRating(rating);
                    };
                };
            };
        },
        updatePlatforms: function (platforms: string[]) {
            let gameDataOptionsCopy = gameDataOptions;
            gameDataOptionsCopy.platforms = platforms;
            setGameDataOptions(gameDataOptionsCopy);
        },
        updateGenre: function (genre: string | null) {
            let gameDataOptionsCopy = gameDataOptions;
            gameDataOptionsCopy.genre = genre;
            setGameDataOptions(gameDataOptionsCopy);
        },
        updateMinRating: function (minRating: number | null) {
            let gameDataOptionsCopy = gameDataOptions;
            gameDataOptionsCopy.minRating = minRating;
            setGameDataOptions(gameDataOptionsCopy);
        },
    };


    // video games pagination code
    const [paginationControls, setPaginationControls] = useState<PaginationControlObject>({
        ready: false,
        isLoaded: false, // isLoaded awaits displayedPages to be set before becoming true
        resultsCount: 0,
        firstPage: 1,
        lastPage: 0,
        currentPage: 1,
        displayedPages: [],
    });
    const paginationFunctions = {
        goToPreviousPage: function () {
            let paginationControlCopy = { ...paginationControls };
            if (paginationControlCopy.currentPage > 1) {
                paginationControlCopy.currentPage = paginationControlCopy.currentPage - 1;
                paginationControlCopy.isLoaded = false;
                setPaginationControls(paginationControlCopy);
                loadData(paginationControlCopy.currentPage - 1);
            };
        },
        goToNextPage: function () {
            let paginationControlCopy = { ...paginationControls };
            if (paginationControlCopy.currentPage < paginationControlCopy.lastPage) {
                paginationControlCopy.currentPage = paginationControlCopy.currentPage + 1;
                paginationControlCopy.isLoaded = false;
                setPaginationControls(paginationControlCopy);
                loadData(paginationControlCopy.currentPage + 1);
            };
        },
        goToFirstPage: function () {
            let paginationControlCopy = { ...paginationControls };
            if (paginationControlCopy.currentPage !== paginationControlCopy.firstPage) {
                paginationControlCopy.currentPage = paginationControlCopy.firstPage;
                paginationControlCopy.isLoaded = false;
                setPaginationControls(paginationControlCopy);
                loadData(paginationControlCopy.firstPage);
            };
        },
        goToLastPage: function () {
            let paginationControlCopy = { ...paginationControls };
            if (paginationControlCopy.currentPage !== paginationControlCopy.lastPage) {
                paginationControlCopy.currentPage = paginationControlCopy.lastPage;
                paginationControlCopy.isLoaded = false;
                setPaginationControls(paginationControlCopy);
                loadData(paginationControlCopy.lastPage);
            };
        },
        goToPage: function (pageNumber: number) {
            let paginationControlCopy = { ...paginationControls };
            paginationControlCopy.currentPage = pageNumber;
            paginationControlCopy.isLoaded = false;
            setPaginationControls(paginationControlCopy);
            loadData(pageNumber);
        },
        updateDisplayedPages: function () {
            let paginationControlCopy = { ...paginationControls };
            // show 9 pages (1 - 9)
            const currentPage = paginationControlCopy.currentPage;
            const firstPage = paginationControlCopy.firstPage;
            const lastPage = paginationControlCopy.lastPage;
            let start: number | null = null;
            let end: number | null = null;
            let displayedPages: number[] = [];
            // offsetLeft and offsetRight is how many positions left or right from center the current page
            // is forced to be due to there not being enough pages before or after it to centralize its position
            // these are fed as extra pages that can be rendered on the right or left side, respectively
            let offsetRight = currentPage > lastPage - 4 ? currentPage - (lastPage - 4) : 0;
            let offsetLeft = currentPage < firstPage + 4 ? (firstPage + 4) - currentPage : 0;
            // determine first page
            if (currentPage < firstPage + (4 + offsetRight)) {
                start = firstPage;
            } else {
                start = currentPage - (4 + offsetRight);
            };
            // determine last page
            if (currentPage > lastPage - (4 + offsetLeft)) {
                end = lastPage;
            } else {
                end = currentPage + (4 + offsetLeft);
            };

            for (let i = start; i < end + 1; i++) {
                displayedPages.push(i);
            };

            paginationControlCopy.displayedPages = displayedPages;
            paginationControlCopy.isLoaded = true;
            setPaginationControls(paginationControlCopy);
            // console.log(paginationControlCopy);
        },
        initializePaginationControl: function (resultsCount: number, goToFirstPage?: boolean) {
            let paginationControlCopy = { ...paginationControls };
            // first page = 1 by default
            // resultsCount is count
            paginationControlCopy.resultsCount = resultsCount;
            if (goToFirstPage) {
                // current page is 1
                paginationControlCopy.currentPage = 1;
            };
            // divide count by num results per page and round UP = num of pages/last page
            let numberOfPages = Math.ceil(resultsCount / 12);
            paginationControlCopy.lastPage = numberOfPages;
            paginationControlCopy.isLoaded = false;
            paginationControlCopy.ready = true;
            setPaginationControls(paginationControlCopy);
            // displayed pages updates via useEffect
        },
    };
    useEffect(() => {
        if (paginationControls.ready && !paginationControls.isLoaded) {
            paginationFunctions.updateDisplayedPages();
        };
    }, [paginationControls, paginationControls.currentPage]);
    useEffect(() => {
        paginationFunctions.initializePaginationControl(videoGames.count);
    }, [videoGames]);



    return (
        <div data-platform={platform}>
            {/* banner */}
            <HeroSection
                bannerObjects={bannerObjects}
                bottomGradient
            />
            {/* console/hardware slide */}
            <div className="section column dark">
                <h1 className="heading">{textFunctions.capitalize(platform)} Consoles</h1>
                <ProductSlider
                    products={consoleProducts}
                    productType="console"
                />
            </div>

            {/* shop video games/accessories */}
            <div className="section column light">
                <h1 className="heading">
                    {textFunctions.capitalize(platform)} Games
                </h1>
                <div className="filter-options">
                    {filterOptions.map((option, index) => {
                        let selectedItem = option.dropdown.selectedItem
                        return <div key={index} className="filter-option">
                            <label htmlFor={`option-dropper`}>{option.label}</label>
                            <div ref={(e: HTMLDivElement) => filterOptionsPointerRefs.current[index] = e} onClick={() => filterOptionsDropdownFunctions.toggle(index)} id={`option-dropper`} className="option-dropper" style={{ width: option.width ?? "" }}>
                                <div ref={(e: any) => filterOptionsInputRefs.current[index] = e}>
                                    {selectedItem.includes(":") ?
                                        <RatingOnly rating={parseInt(selectedItem.split(": ")[1])} />
                                        :
                                        selectedItem
                                    }
                                </div>
                                <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                                {filterOptionsPointerRefs.current[index] &&
                                    <Dropdown
                                        open={option.dropdown.open}
                                        itemsList={option.dropdown.itemsList}
                                        pointerRefCurrent={filterOptionsPointerRefs.current[index]}
                                        onClose={() => filterOptionsDropdownFunctions.close(index)}
                                    />
                                }
                            </div>
                        </div>
                    })}
                    <div className="filter-option">
                        <label htmlFor={`option-dropper`}>ESRB</label>
                        <div id={`option-dropper`} className="option-dropper">
                            <p>Everyone</p>
                            <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                        </div>
                    </div>
                    {/* <div className="filter-option">
                        <label htmlFor={`option-dropper`}>Price Range</label>
                        <div id={`option-dropper`} className="option-dropper">
                            <p>$ ...</p>
                            <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                        </div>
                    </div> */}
                </div>
                <p className="gray-text">{paginationControls.resultsCount ?? "896"} {paginationControls.resultsCount === 1 ? "result" : "results"}</p>
                <div ref={productsSectionRef} className="products-section">
                    <div className="products-container position-relative">

                        <Loading
                            open={!videoGames.isLoaded}
                            closureDelay={1500}
                            overlayFillType="fillElement"
                        />

                        {videoGames.games.map((game: any, index: number) => {
                            return platform && <ProductCard
                                key={index}
                                index={index}
                                productType="video-game"
                                game={game}
                                consoleName={filterOptions[0].dropdown.selectedItem}
                            />
                        })}
                    </div>
                    <div className="pagination">
                        <button onClick={() => paginationFunctions.goToFirstPage()} className="firstBtn" data-disabled={paginationControls.currentPage === 1}>
                            <span className={gIcon}>keyboard_double_arrow_left</span>
                        </button>
                        <button onClick={() => paginationFunctions.goToPreviousPage()} className="previousBtn" data-disabled={paginationControls.currentPage === 1}>
                            <span className={gIcon}>keyboard_arrow_left</span>
                        </button>

                        {paginationControls.displayedPages.map((num, index) => {
                            let offset = paginationControls.displayedPages[0] - 1;
                            let pageNumber = index + 1 + offset;
                            return <button
                                key={index}
                                onClick={() => paginationFunctions.goToPage(pageNumber)}
                                className="pageBtn"
                                data-selected={paginationControls.currentPage === pageNumber}
                            >
                                {num}
                            </button>
                        })}

                        <button onClick={() => paginationFunctions.goToNextPage()} className="nextBtn" data-disabled={paginationControls.currentPage === paginationControls.lastPage}>
                            <span className={gIcon}>keyboard_arrow_right</span>
                        </button>
                        <button onClick={() => paginationFunctions.goToLastPage()} className="lastBtn" data-disabled={paginationControls.currentPage === paginationControls.lastPage}>
                            <span className={gIcon}>keyboard_double_arrow_right</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ConsolePage;