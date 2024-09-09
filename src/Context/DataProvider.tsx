import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { ConsoleName, GenreObject, PlatformObject, Product } from "../types";
import { useNavigate } from "react-router-dom";

const DataProvider = (props: any) => {
    const navigate = useNavigate();
    // helper shorthands
    const gIcon = "material-symbols-outlined";

    // helper functions
    const textFunctions = {
        capitalize: function (str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        titalize: function (str: string): string {
            const words = str.split(" ")
            for (let i = 0; i < words.length; i++) {
                words[i] = textFunctions.capitalize(words[i]);
            }
            return words.join(" ");
        }
    };
    const timeFunctions = {
        datinormal: function (systemDate: any, dateOrTime?: "date" | "time" | "dateAndTime" | null) {
            // system date => mm/dd/yyyy
            let day = systemDate.getDate().toString().length === 1 ? "0" + systemDate.getDate() : systemDate.getDate()
            let month = systemDate.getMonth().toString().length + 1 === 1 ? "0" + (systemDate.getMonth() + 1) : systemDate.getMonth() + 1
            if (month.toString().length === 1) {
                month = "0" + month
            }
            let fullYear = systemDate.getFullYear();
            let hour = systemDate.getHours().toString().length === 1 ? "0" + systemDate.getHours() : systemDate.getHours();
            let minutes = systemDate.getMinutes().toString().length === 1 ? "0" + systemDate.getMinutes() : systemDate.getMinutes();
            let timeConverted = hour + ":" + minutes;
            let dateConverted = month + "/" + day + "/" + fullYear
            if (!dateOrTime || dateOrTime === "date") {
                return dateConverted
            } else if (dateOrTime === "time") {
                return timeConverted
            } else if (dateOrTime === "dateAndTime") {
                return dateConverted + ", " + timeConverted
            } else {
                // else block to remove possibility of returning undefined type output
                return ""
            };
        },
        datify: function (normalDate: string) {
            // mm/dd/yyyy => mmm dd, yy
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let day = normalDate.slice(3, 5);
            let monthNum = normalDate.slice(0, 2);
            if (monthNum.charAt(0) === "0") {
                monthNum = monthNum[1];
            }
            let fullYear = normalDate.slice(6);
            const month = months[parseInt(monthNum) - 1];
            if (day.charAt(0) === "0") {
                day = day[1];
            }
            let twoYear = fullYear.slice(2);
            return month + " " + day + ", " + twoYear;
        },
        datidash: function (normalDate: string) {
            // mm/dd/yyyy => yyyy-mm-dd
            let year = normalDate.slice(6);
            let month = normalDate.slice(0, 2);
            let day = normalDate.slice(3, 5);
            return year + "-" + month + "-" + day
        },
        datiundash: function (dashDate: string) {
            // yyyy-mm-dd => mm/dd/yyyy
            let fullyear = dashDate.slice(0, 4)
            let month = dashDate.slice(5, 7)
            let day = dashDate.slice(8)
            return month + "/" + day + "/" + fullyear
        },
        dayToDate: function (days: number): string {
            let year = new Date().getFullYear();
            let isLeapYear: boolean = year % 4 === 0;
            let totalDays: number = isLeapYear ? 366 : 365;
            if (days < 0) {
                return "Number of days must be positive"
            }
            while (days > totalDays) {
                days -= totalDays;
                year += 1;
                isLeapYear = year % 4 === 0;
                totalDays = isLeapYear ? 366 : 365;
            };
            const months = {
                "01": 31,
                "02": isLeapYear ? 29 : 28,
                "03": 31,
                "04": 30,
                "05": 31,
                "06": 30,
                "07": 31,
                "08": 31,
                "09": 30,
                "10": 31,
                "11": 30,
                "12": 31,
            };
            // if days is less than or equal to month days then stop 
            const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            for (let i = 0; i < monthArr.length; i++) {
                const monthNum = monthArr[i][0];
                const monthDays = monthArr[i][1];
                if (days > monthDays) {
                    days -= monthDays;
                } else {
                    const dayOfTheMonth = days.toString().length === 2 ? days.toString() : "0" + days.toString();
                    const monthOfTheYear = monthNum;
                    return monthOfTheYear + "/" + dayOfTheMonth + "/" + year.toString();
                }
            }
            return "Function should never reach this point"
        },
        dateToDay: function (date: string): number {
            // this func doesn't validate the date exists i.e. 01/32/2024 would take
            const year = new Date().getFullYear();
            const isLeapYear: boolean = year % 4 === 0;
            const dateMonth: string = date.slice(0, 2);
            const dateDays: number = parseInt(date.slice(3, 5));
            let days: number = 0;
            const months = {
                "01": 31,
                "02": isLeapYear ? 29 : 28,
                "03": 31,
                "04": 30,
                "05": 31,
                "06": 30,
                "07": 31,
                "08": 31,
                "09": 30,
                "10": 31,
                "11": 30,
                "12": 31,
            };
            const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            for (let i = 0; i < monthArr.length; i++) {
                const monthNum: string = monthArr[i][0];
                const monthDays: number = monthArr[i][1];
                if (dateMonth === monthNum) {
                    // add days from date
                    days += dateDays;
                    // stop
                    break;
                } else {
                    // add monthDays
                    days += monthDays;
                };
            };
            return days;
        },
        addDays: function (date: string, days: number): string {
            let yearDay: number = timeFunctions.dateToDay(date);
            yearDay += days;
            date = timeFunctions.dayToDate(yearDay);
            return date;
        },
    };
    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const createArrFromObjectKey = (arr: any[], key: string | string[]): any[] => {
        let result = [];
        if (typeof key === "string") {
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i][key]);
            };
        } else {
            for (let i = 0; i < arr.length; i++) {
                let pathLocation: any = arr[i];
                for (let j = 0; j < key.length; j++) {
                    pathLocation = pathLocation[key[j]]
                    if (j === key.length - 1) {
                        result.push(pathLocation);
                    };
                };
            };
        };
        return result;
    };
    // get functions
    const getGames = async (platforms: string[], page?: number) => {
        let platformIds = platformToPlatformId(platforms);
        let url = `https://api.rawg.io/api/games?&platforms=${platformIds.join(",")}&page_size=12${page ? `&page=${page}` : ""}&key=${import.meta.env.VITE_APP_RAWG_API_KEY}`
        const response = await axios.get(url)
        return handleGameData(response.data);
        // .then((response) => {
        //     console.log(resp);
        //     console.log(response);

        //     return data;
        //     // return response.data;
        // })
        // .catch((error) => {
        //     console.log(error);
        //     return null;
        // })
    };
    const handleGameData = async (data: any) => {
        let result: any = [];
        for (let game of data.results) {
            result.push({
                // copy keys
                name: game.name,
                background_image: game.background_image,
                genres: game.genres,
                playtime: game.playtime,
                rating: game.rating,
                ratings_count: game.ratings_count,
                // none-copy keys
                hot: game.added_by_status.owned >= 10000,
                sale: parseInt(game.released.split("-")[0]) <= 2014,
                price: "$69.99",
                productType: "video-game",
                gameDeveloper: "Santa Monica Studios",
                esrb_rating: game.esrb_rating ? game.esrb_rating.name : "None",
                gameId: game.id,
                consoles: createArrFromObjectKey(game.platforms, ["platform", "name"]),
                imgReel: createArrFromObjectKey(game.short_screenshots, "image"),
                // onConsole
                // favorite
            });
        };
        console.log("data: ", result);
        return result;
    };

    // product functions
    const platformToPlatformId = (platforms: string[]): string[] => {
        const platformIds: string[] = [];
        const ps4Slugs: string[] = ["playstation4", "playstation 4", "ps4"];
        const ps5Slugs: string[] = ["playstation5", "playstation 5", "ps5"];
        const xboxOneSlugs: string[] = ["one", "xbox one", "xbox-one", "xo", "xboxone"];
        const xboxSXSlugs: string[] = ["xboxseriesx", "xbox series x", "series x", "xsx"];
        const nintendoSlugs: string[] = ["nintendo", "nintendo switch", "nintendo-switch", "nintendoswitch"];
        const pcSlugs: string[] = ["pc"];
        for (let i = 0; i < platforms.length; i++) {
            if (ps4Slugs.includes(platforms[i].toLowerCase())) {
                // if ps4 - 18
                platformIds.push("18");
            } else if (ps5Slugs.includes(platforms[i].toLowerCase())) {
                // if ps5 - 187
                platformIds.push("187");
            } else if (xboxOneSlugs.includes(platforms[i].toLowerCase())) {
                // if xbox1 - 1
                platformIds.push("1");
            } else if (xboxSXSlugs.includes(platforms[i].toLowerCase())) {
                // if xboxSX - 186
                platformIds.push("186");
            } else if (pcSlugs.includes(platforms[i].toLowerCase())) {
                // if pc - 4
                platformIds.push("4");
            } else if (nintendoSlugs.includes(platforms[i].toLowerCase())) {
                // if nintendo - 7
                platformIds.push("7");
            }
        }
        return platformIds;
    };
    const starImgs = {
        noStar: "https://i.imgur.com/7T9CNME.png",
        fullStar: "https://i.imgur.com/3eEFOjj.png",
        halfStar: "https://i.imgur.com/gL5QY1I.png",
    };
    const numToRating = (num: number): number[] => {
        if (num >= 4.75) {
            return [1, 1, 1, 1, 1];
        };
        if (num < 0.25) {
            return [0, 0, 0, 0, 0];
        };

        let ratingArr: number[] = [];
        for (let i = 0; i < 5; i++) {
            if (num >= 0.75) {
                ratingArr.push(1);
            } else if (num < 0.25) {
                ratingArr.push(0);
            } else {
                ratingArr.push(0.5);
            };
            num -= 1;
        };
        return ratingArr;
    };
    const convertPlatformsToString = (platformsObjectArr: PlatformObject[]): string => {
        let platformsArr = [];
        for (let i = 0; i < platformsObjectArr.length; i++) {
            platformsArr.push(platformsObjectArr[i].slug);
        };
        return platformsArr.join(":");
    };
    const getGenre = (genreObjectArr: GenreObject[]): string => {
        let genreArr = [];
        for (let i = 0; i < genreObjectArr.length; i++) {
            genreArr.push(genreObjectArr[i].name);
        };
        return genreArr.join(":");
    };

    // product page
    type ProductControls = {
        isNavigating: boolean
        selectedProduct: Product | null
    };
    const [productControls, setProductControls] = useState<ProductControls>({
        isNavigating: false,
        selectedProduct: null,
    });
    const instanceOfProduct = (object: any): object is Product => {
        return 'member' in object;
    };
    const productPageFunctions = {
        viewProduct: function (product: Product, consoleName?: ConsoleName) {
            if (product.productType === "video-game") {
                // for video-games console name is required
                if (consoleName) {
                    let productCopy = { ...product, onConsole: consoleName };
                    product = productCopy;
                };
            };
            console.log(product);
            setProductControls({ ...productControls, selectedProduct: product, isNavigating: true });
        },
        updateProduct: function (key: string, value: string | number | null) {
            let updatedProduct: any = { ...productControls.selectedProduct };
            // let displacedValue = productControls.selectedProduct[key]
            updatedProduct[key] = value;
            if (instanceOfProduct(updatedProduct)) {
                setProductControls({ ...productControls, selectedProduct: updatedProduct })
            };
        },
    };
    useEffect(() => {
        if (productControls.selectedProduct && productControls.isNavigating) {
            navigate('/product');
            setProductControls({ ...productControls, isNavigating: false });
        };
    }, [productControls.selectedProduct]);


    // test data
    const testGameProduct: Product = {
        gameDeveloper: "Rockstar Games",
        productType: "video-game",
        name: "Grand Theft Auto V",
        background_image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
        genres: [
            {
                id: 4,
                name: "Action",
            }
        ],
        rating: 4.47,
        esrb_rating: "18+",
        ratings_count: 6860,
        consoles: [
            'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Nintendo'
        ],
        price: "$69.99",
        playtime: 126,
        imgReel: [
            'https://i.imgur.com/ZStckzM.jpg',
            'https://i.imgur.com/yaoZCJi.png',
            'https://i.imgur.com/MiC1pkn.png',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
        ],
        favorite: false,
        onConsole: "PlayStation 4",
        gameId: "GAME-ID-FROM-API",
    };
    const testGameProduct2: Product = {
        name: "God of War: Ragnorak",
        imgReel: [
            'https://i.imgur.com/ZStckzM.jpg',
            'https://i.imgur.com/yaoZCJi.png',
            'https://i.imgur.com/MiC1pkn.png',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
            'https://i.imgur.com/YA9kNGf.jpg',
        ],
        price: "$69.99",
        playtime: 70,
        productType: "video-game",
        gameDeveloper: "Santa Monica Studios",
        background_image: "https://i.imgur.com/ZStckzM.jpg",
        genres: [
            {
                id: 4,
                name: 'Action',
            }
        ],
        rating: 4.6,
        ratings_count: 91,
        esrb_rating: "18+",
        consoles: [
            'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Nintendo'
        ],
        favorite: false,
        onConsole: "PlayStation 5",
        gameId: "GAME-ID-FROM-API",
    };

    return (
        <DataContext.Provider value={{
            textFunctions, timeFunctions, wait, gIcon, platformToPlatformId,
            starImgs, getGames, getGenre, convertPlatformsToString, numToRating,
            selectedProduct: productControls.selectedProduct, productPageFunctions,
            testGameProduct, testGameProduct2
        }}>
            {props.children}
        </DataContext.Provider>
    )
}
export default DataProvider
export const DataContext = createContext<any>(null);