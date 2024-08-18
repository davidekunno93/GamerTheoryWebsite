import HeroSection from "../../Components/HeroSection/HeroSection";

const ConsolePage = () => {
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
        
    ]
    
    return (
        <>
            {/* banner */}
            <HeroSection
                bannerObjects={bannerObjects}
            />
            {/* console hardware slide */}
            {/* shop video games/accessories */}
        </>
    )
}
export default ConsolePage;