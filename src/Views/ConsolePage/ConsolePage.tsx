import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import './consolepage.scoped.css'
import { DataContext } from "../../Context/DataProvider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Dropdown from "../../Components/Dropdown/Dropdown";
import RatingOnly from "../../Components/RatingsDisplay/RatingOnly";
import { GameDataOptions, PaginationControlObject } from "../../types";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../Components/Loader/Loading";

const ConsolePage = () => {
    const { gIcon, textFunctions, testGameProduct, getGames, wait, consolesLibrary } = useContext(DataContext);

    // page load
    const { state } = useLocation();
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (!state) return;
        wait(400).then(() => {
            if (state.disposition === "console") {
                scrollToConsoleSection();
            } else if (state.disposition === "video-games") {
                scrollToProductsSection();
            };
        })
    }, []);


    const { platform } = useParams<any>();
 

    // page setting variables
    const bannerObjects = platform ? consolesLibrary[platform].bannerObjects : null;
    const consoleProducts = platform ? consolesLibrary[platform].consoleProducts : null;
    const updateFilterOptionsConsoleDropdown = () => {
        if (platform) {
            let filterOptionsCopy = [...filterOptions];
            filterOptionsCopy[0].dropdown.selectedItem = consolesLibrary[platform].consoles[0];
            filterOptionsCopy[0].dropdown.selectedItem = consolesLibrary[platform].consoles[0];
            let itemsList = [];
            let consoleItems = consolesLibrary[platform].consoles;
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
    const consoleSectionRef = useRef<HTMLDivElement>(null);
    const scrollToConsoleSection = () => {
        if (!consoleSectionRef.current) return;
        window.scrollTo({
            top: consoleSectionRef.current.offsetTop - 24,
            behavior: "smooth",
        });
    };
    const productsSectionRef = useRef<HTMLDivElement>(null);
    const scrollToProductsSection = () => {
        if (!productsSectionRef.current) return;
        window.scrollTo({
            top: productsSectionRef.current.offsetTop - 60,
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


    const convertMinRatingToPercent = (minRating: number | null): number | null => {
        if (!minRating) return null;
        return parseInt((minRating / 5 * 100).toFixed(0));
    };
    
    const loadData = async (pageNumber?: number | null, scrollToProducts?: boolean | null, platforms?: string[] | null)  => {
        setVideoGames({ ...videoGames, isLoaded: false });
        const gameData = await getGames(platforms ?? gameDataOptions.platforms, pageNumber, gameDataOptions.genre, convertMinRatingToPercent(gameDataOptions.minRating));
        if (pageNumber || scrollToProducts) {
            setVideoGames({ ...gameData, scrollToProducts: true, isLoaded: true });
        } else {
            setVideoGames({ ...gameData, scrollToProducts: false, isLoaded: true });
        };
    };
    useEffect(() => {
        if (platform) {
            setGameDataOptions({ ...gameDataOptions, platforms: [consolesLibrary[platform].consoles[0]]});
        };
    }, [platform]);
    const [gameDataOptions, setGameDataOptions] = useState<GameDataOptions>({
        pageSize: 12,
        // esrbRating: null,
        platforms: ["PS5"],
        genre: null,
        minRating: null,
    });



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
            loadData(1);
        },
        updateGenre: function (genre: string | null) {
            let gameDataOptionsCopy = gameDataOptions;
            gameDataOptionsCopy.genre = genre;
            setGameDataOptions(gameDataOptionsCopy);
            loadData(1);
        },
        updateMinRating: function (minRating: number | null) {
            let gameDataOptionsCopy = gameDataOptions;
            gameDataOptionsCopy.minRating = minRating;
            setGameDataOptions(gameDataOptionsCopy);
            loadData(1);
        },
    };
    // useEffect(() => {
        
    // }, [platform]);    
    
  


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
            <div ref={consoleSectionRef} className="section column dark">
                <h1 className="heading">{textFunctions.capitalize(platform)} Consoles</h1>
                <ProductSlider
                    products={consoleProducts}
                    productType="console"
                />
            </div>

            {/* shop video games/accessories */}
            <div className="section column light">
                <h1 onClick={() => scrollToConsoleSection()} className="heading">
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
                    {/* <div className="filter-option">
                        <label htmlFor={`option-dropper`}>ESRB</label>
                        <div id={`option-dropper`} className="option-dropper">
                            <p>Everyone</p>
                            <span className={gIcon + " arrow"}>keyboard_arrow_down</span>
                        </div>
                    </div> */}
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
                            loaderPosition="fixed"
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