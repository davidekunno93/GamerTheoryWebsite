import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { ConsoleName, GenreObject, PlatformObject, Product, Reviews } from "../types";
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
    const isVowel = (char: string) => {
        char = char.toLowerCase();
        return char === "a" || char === "e" || char === "i" || char === "o" || char === "u";
    };
    const getDotColor = (opinion: string): string | null => {
        if (opinion === "skip") {
            return "gray";
        } else if (opinion === "notBad") {
            return "yellow";
        } else if (opinion === "good") {
            return "orange";
        } else if (opinion === "exceptional") {
            return "red";
        };
        return null;
    };
    const createArrFromObjectKey = (arr: any[], key: string | string[]): any[] => {
        // for when you have a list of objects and you want to get a list of a specific key
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
    const createReviewsArr = (reviews: any[]): Reviews => {
        let result = {
            skip: reviews[3].percent,
            notBad: reviews[2].percent,
            good: reviews[1].percent,
            exceptional: reviews[0].percent,
        };
        return result;
    };


    // libraries
    const consolesLibrary: any = {
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
                    imgUrl: "https://i.imgur.com/O5i3fx0.png",
                    imgReel: [
                        "https://i.imgur.com/JOF0w0U.png",
                        "https://i.imgur.com/hGApMbf.jpg",
                        "https://i.imgur.com/A3YFfaH.jpg",
                        "https://i.imgur.com/Os3NlpI.jpg",
                        "https://i.imgur.com/Eqm1pQE.jpg",
                        "https://i.imgur.com/Usyaekb.jpg",
                        "https://i.imgur.com/qN6XFGV.jpg",
                    ],
                    productType: "console",
                    platform: 'playstation',
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 5 Slim Digital Edition",
                    price: "$449.99",
                    imgUrl: "https://i.imgur.com/Zo4Iq5K.png",
                    imgReel: [
                        "https://i.imgur.com/aJcmSy3.jpg",
                    ],
                    productType: "console",
                    platform: 'playstation',
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 4 Pro 1TB",
                    price: "$299.99",
                    imgUrl: "https://i.imgur.com/YcJfKfb.png",
                    imgReel: [
                        "https://i.imgur.com/YcJfKfb.png",
                    ],
                    productType: "console",
                    platform: 'playstation',
                },
                {
                    productMake: "Sony Interactive Entertainment",
                    name: "PlayStation 4 Slim 500GB",
                    price: "$279.99",
                    imgUrl: "https://i.imgur.com/wPN1D2d.png",
                    imgReel: [
                        "https://i.imgur.com/wPN1D2d.png",
                    ],
                    productType: "console",
                    platform: 'playstation',
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
                    imgReel: [
                        "https://i.imgur.com/H65yNiT.png",
                    ],
                    productType: "console",
                    platform: 'xbox',
                },
                {
                    productMake: "Microsoft",
                    name: "Xbox One S 1TB",
                    price: "$449.99",
                    imgUrl: "https://i.imgur.com/WVpHH0m.png",
                    imgReel: [
                        "https://i.imgur.com/WVpHH0m.png",
                    ],
                    productType: "console",
                    platform: 'xbox',
                },
                {
                    productMake: "Microsoft",
                    name: "Xbox One X 1TB (Renewed)",
                    price: "$154.99",
                    imgUrl: "https://i.imgur.com/X78WguU.png",
                    imgReel: [
                        "https://i.imgur.com/X78WguU.png",
                    ],
                    productType: "console",
                    platform: 'xbox',
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
                    imgReel: [
                        "https://i.imgur.com/tW11rZ0.png",
                    ],
                    productType: "console",
                    platform: 'nintendo',
                },
            ],
        },
    };


    // get game data functions
    const getGames = async (platforms: string[], pageNumber?: number, genre?: string, metacritic?: number) => {
        let platformIds = platformToPlatformId(platforms);
        let url = `https://api.rawg.io/api/games?&platforms=${platformIds.join(",")}${genre ? `&genres=${genre.toLowerCase()}` : ""}${metacritic ? `&metacritic=${metacritic}` : ""}&page_size=12${pageNumber ? `&page=${pageNumber}` : ""}&key=${import.meta.env.VITE_APP_RAWG_API_KEY}`
        console.log(url)
        const response = await axios.get(url)
        return handleGameData(response.data);
    };
    const handleGameData = async (data: any) => {
        let result: any = [];
        const count = data.count;
        const pages = Math.ceil(count / data.results.length);
        for (let game of data.results) {
            result.push({
                // copy keys
                name: game.name,
                background_image: game.background_image,
                genres: game.genres,
                playtime: game.playtime,
                rating: game.rating,
                ratings_count: game.ratings_count,
                metacritic: game.metacritic,
                metacritic_url: game.metacritic_url,
                // none-copy keys
                // genre: game.genres.map((genre: any) => genre.name).join(", "),
                genre: game.genres[0].name,
                reviews: createReviewsArr(game.ratings),
                bestseller: game.added_by_status.owned >= 10000,
                sale: parseInt(game.released.split("-")[0]) <= 2014,
                price: "$69.99",
                productType: "video-game",
                gameDeveloper: "Santa Monica Studios",
                esrb_rating: game.esrb_rating ? game.esrb_rating.name : "None",
                gameId: game.id,
                consoles: createArrFromObjectKey(game.platforms, ["platform", "name"]),
                imgReel: createArrFromObjectKey(game.short_screenshots, "image"),
            });
        };
        console.log("data: ", result);
        return {
            games: result,
            count: count,
            pages: pages
        };
    };
    const getGameDetails = async (gameId: "TEST-GAME-ID" | string | number) => {
        if (gameId === "TEST-GAME-ID") return;
        const game_pk = gameId;
        let url = `https://api.rawg.io/api/games/${game_pk}?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`
        const response = await axios.get(url)
        return handleGameDetailsData(response.data);
    };
    const handleGameDetailsData = async (data: any) => {
        const gameDeveloper: string = data.publishers[0].name;
        const description: string = data.description_raw;
        return {
            gameDeveloper: gameDeveloper,
            description: description,
        };
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
        viewProduct: async function (product: Product, consoleName?: ConsoleName) {
            if (product.productType === "video-game") {
                // for video-games console name is required
                if (!consoleName) return;
                const gameDetailsData = await getGameDetails(product.gameId);
                let productCopy = { ...product, onConsole: consoleName, ...gameDetailsData };
                product = productCopy;
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
            navigate(`/product/${productControls.selectedProduct.name.replace(/ /g, "-").toLowerCase()}`);
            setProductControls({ ...productControls, isNavigating: false });
        };
    }, [productControls.selectedProduct]);


    // test data
    const testGameProduct: Product = {
        gameDeveloper: "Rockstar Games",
        productType: "video-game",
        name: "Grand Theft Auto V",
        description: "Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. Simultaneous storytelling from three unique perspectives:  Follow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from.  GTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged. Español Rockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización. Narración simultánea desde tres perspectivas únicas: Sigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir. GTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.",
        background_image: "https://i.imgur.com/wvmVtjo.png",
        genre: "Action",
        genres: [
            {
                id: 4,
                name: "Action",
            }
        ],
        rating: 4.47,
        esrb_rating: "18+",
        ratings_count: 6860,
        bestseller: true,
        reviews: {
            skip: 1.85,
            notBad: 6.32,
            good: 32.69,
            exceptional: 59.14,
        },
        metacritic: 97,
        metacritic_url: "https://www.metacritic.com/game/pc/grand-theft-auto-v",
        consoles: [
            'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Nintendo'
        ],
        price: "$69.99",
        playtime: 126,
        imgReel: [
            'https://i.imgur.com/mRYGveO.jpg',
            'https://i.imgur.com/RxGgCQy.jpg',
            'https://i.imgur.com/qCNTwgm.jpg',
            'https://i.imgur.com/QwK4Wyh.jpg',
            'https://i.imgur.com/XkDqW0A.jpg',
            'https://i.imgur.com/xuN7QT5.jpg',
            'https://i.imgur.com/eCNifWe.jpg',
            'https://i.imgur.com/tOVMNae.jpg',
            'https://i.imgur.com/MU5wsOF.jpg',
            'https://i.imgur.com/xjWOQYu.jpg',
        ],
        favorite: false,
        onConsole: "PlayStation 4",
        gameId: "TEST-GAME-ID",
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
        metacritic: 94,
        metacritic_url: "https://www.metacritic.com/game/pc/god-of-war-ragnorak",
        background_image: "https://i.imgur.com/ZStckzM.jpg",
        genre: "Action",
        genres: [
            {
                id: 4,
                name: 'Action',
            }
        ],
        rating: 4.6,
        ratings_count: 91,
        reviews: {
            skip: 1.85,
            notBad: 6.32,
            good: 32.69,
            exceptional: 59.14,
        },
        esrb_rating: "18+",
        consoles: [
            'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Nintendo'
        ],
        favorite: false,
        onConsole: "PlayStation 5",
        gameId: "TEST-GAME-ID",
    };

    return (
        <DataContext.Provider value={{
            textFunctions, timeFunctions, wait, gIcon, platformToPlatformId,
            starImgs, getGames, getGenre, convertPlatformsToString, numToRating,
            selectedProduct: productControls.selectedProduct, productPageFunctions,
            testGameProduct, testGameProduct2, isVowel, getDotColor, consolesLibrary
        }}>
            {props.children}
        </DataContext.Provider>
    )
}
export default DataProvider
export const DataContext = createContext<any>(null);