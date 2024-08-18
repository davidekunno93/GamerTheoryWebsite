// Hero Section
export type HeroSectionProps = {
    bannerObjects: BannerObject[]
}
type BannerObject = {
    title?: string
    imgUrl: string
    text?: string
    btnText: string
    link: string
    objectPosition?: string
}


// Dashboard
export type SidePanelProps = {
    open: boolean
    onClose: () => void
}

export type OptionObject = {
    heading: string
    options: Option[]
}
type Option = {
    title: string
    preTitle: string | null
    postTitle: string | null
    redText: string[]
    googleIconPrompt: string
    subOptions?: SubOption[]
}
type SubOption = {
    title: string
    subTwoOptions?: Object[]
    link: string
}

// Search Bar
export type SearchBarProps = {
    width: number
    placeholder?: string
}

// Navbar
export type NavbarProps = {
    setSidePanelOpen: Function
  }