// Hero Section
export type HeroSectionProps = {
    bannerObjects: BannerObject[]
    bottomGradient?: boolean
    platform?: string
};
type BannerObject = {
    title?: string
    imgUrl: string
    text?: string
    btnText: string
    link: string
    objectPosition?: string
};


// Dashboard
export type SidePanelProps = {
    open: boolean
    onClose: () => void
};

export type OptionObject = {
    heading: string
    options: Option[]
};
type Option = {
    title: string
    preTitle: string | null
    postTitle: string | null
    redText: string[]
    googleIconPrompt: string
    subOptions?: SubOption[]
};
type SubOption = {
    title: string
    subTwoOptions?: Object[]
    link: string
};

// Search Bar
export type SearchBarProps = {
    width: number
    placeholder?: string
};

// Navbar
export type NavbarProps = {
    setSidePanelOpen: Function
};
export type SubNavOption = {
    itemName: string
    link: string
    redOption?: boolean
};


// console page
export type PlatformObject = {
    id: number
    name: string
    slug: string
};
export type GenreObject = {
    id: number
    name: string
};
export type PaginationControlObject = {
    ready: boolean
    isLoaded: boolean
    resultsCount: number
    firstPage: number
    lastPage: number
    currentPage: number
    displayedPages: number[]
};

// product page
export type ProductPageProps = {
    product: Product
};
export type Product = {
    name: string
    imgReel: string[]
    price: string
} & (GameProduct | ConsoleProduct)

export type Reviews = {
    exceptional: number
    good: number
    notBad: number
    skip: number
}
export type GameProduct = {
    productType: "video-game"
    background_image: string
    genres: GenreObject[]
    playtime: number
    rating: number
    ratings_count: number
    esrb_rating: string
    consoles: string[]
    onConsole: ConsoleName
    reviews: Reviews
    metacritic: number
    metacritic_url: string
    description?: string
    gameDeveloper?: string
    favorite?: boolean
    hot?: boolean
    sale?: boolean
    gameId: "TEST-GAME-ID" | string | number
};
export type ConsoleName = "PlayStation 5" | "PlayStation 4" | "Xbox Series X" | "Xbox One" | "Nintendo" | "PC"
export type ConsoleProduct = {
    productType: "console"
    productMake: string
    imgUrl: string
};


// product card 
export type ProductCardProps = {
    index: number
    darkCard?: boolean
} & (ConsoleCardProps | VideoGameCardProps);

export type ConsoleCardProps = {
    productType: "console"
    console: any
};
export type VideoGameCardProps = {
    productType: "video-game"
    game: Game
    consoleName?: string
};
export type Game = {
    name: string
    background_image: string
    rating: number
    ratings_count: number
    platforms: PlatformObject[] | string
    genres: GenreObject[] | string
    price?: string
    favorite?: boolean
};

// General
export type ObjectWithStringValues = {
    [key: string]: string
};

export type itemObject = {
    itemName:string
    clickFunction: any
    gIconPrompt? :string
};
export type consoleObject = {
    id: number
    name: string
    slug: string
};

// for api call
export type GameDataOptions = {
    pageSize: number
    esrbRating: string | null
    platforms: string[]
    genre: string | null
    minRating: number | null
};