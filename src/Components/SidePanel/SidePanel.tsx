import { Fade } from 'react-awesome-reveal';
import './sidepanel.scoped.css'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { OptionObject, SidePanelProps } from '../../types';


const SidePanel = ({ open, onClose }: SidePanelProps) => {
    if (!open) return null;
    // imports
    const { wait, gIcon } = useContext(DataContext);

    // panel actions
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        wait(200).then(() => {
            setIsOpen(true);
        })
    }, []);
    const closePanel = () => {
        setIsOpen(false);
        wait(200).then(() => {
            const overlay: HTMLElement | null = document.getElementById('sidePanelOverlay');
            if (overlay) {
                overlay.style.opacity = "0";
            }
            wait(200).then(() => {
                onClose();
            })
        })
    }

    // data for panel
    const panelOptions: OptionObject[] = [
        {
            heading: "Shop By Category",
            options: [
                {
                    title: "Consoles & Hardware",
                    preTitle: null,
                    postTitle: null,
                    redText: [],
                    googleIconPrompt: "power",
                    subOptions: [
                        {
                            title: "Playstation",
                            subTwoOptions: [],
                            link: "",
                        },
                        {
                            title: "Xbox",
                            subTwoOptions: [],
                            link: "",
                        },
                        {
                            title: "Nintendo",
                            subTwoOptions: [],
                            link: "",
                        },
                        {
                            title: "PC",
                            subTwoOptions: [],
                            link: "",
                        },
                    ]
                },
                {
                    title: "Video Games",
                    preTitle: null,
                    postTitle: null,
                    redText: [],
                    googleIconPrompt: "stadia_controller",
                    subOptions: [
                        {
                            title: "Playstation",
                            subTwoOptions: [
                                {
                                    title: "Playstation 5",
                                    link: ""
                                },
                                {
                                    title: "Playstation 4",
                                    link: ""
                                },
                            ],
                            link: "",
                        },
                        {
                            title: "Xbox",
                            subTwoOptions: [
                                {
                                    title: "Xbox Series X",
                                    link: ""
                                },
                                {
                                    title: "Xbox One",
                                    link: ""
                                },
                            ],
                            link: "",
                        },
                        {
                            title: "Nintendo",
                            link: "",
                        },
                        {
                            title: "PC",
                            link: "",
                        },
                    ]
                },
                {
                    title: "Hot Deals",
                    preTitle: null,
                    postTitle: null,
                    redText: ["title"],
                    googleIconPrompt: "local_fire_department",
                    // subOptions: [
                    //     {
                    //         title: "",
                    //         link: "",
                    //     },
                    // ]
                },
                {
                    title: "Pokemon Cards",
                    preTitle: "NEW!",
                    postTitle: null,
                    redText: ["preTitle"],
                    googleIconPrompt: "star",
                    // subOptions: [
                    //     {
                    //         title: "",
                    //         link: "",
                    //     },
                    // ]
                },
            ]
        },
        {
            heading: "Customer Support",
            options: [
                {
                    title: "Support",
                    preTitle: null,
                    postTitle: null,
                    redText: [],
                    googleIconPrompt: "info",
                    subOptions: [
                        {
                            title: "Frequently Asked Questions",
                            link: "",
                        },
                        {
                            title: "Customer Help Center",
                            link: "",
                        },
                    ]
                },
            ]
        },
    ]


    return (
        <div className="overlay-placeholder">
            <Fade duration={200}>
                <div id='sidePanelOverlay' className="overlay-lite">
                    <div id='sidePanel' className={`side-panel ${isOpen ? "open" : "closed"}`}>
                        <div className="head">
                            <p className="title">Menu</p>
                            <span onClick={() => closePanel()} className={`${gIcon} position-right pointer`}>close</span>
                        </div>
                        <div className="body">
                            {/* PROFILE TAB */}
                            <div className="sub-head  pointer">
                                <div className="text">
                                    <p className='title'>Hi, David</p>
                                    <p className='sub-title'>Account Settings</p>
                                </div>
                                <div className="profile-imgDiv">
                                    <p>D</p>
                                </div>
                            </div>
                            {/* PANEL OPTIONS */}
                            <div className="panel-options">
                                {panelOptions.map((optionObject, i) => {
                                    return <>
                                        <p key={i} className="heading">{optionObject.heading}</p>
                                        {optionObject.options.map((option, j) => {
                                            return <div key={j} className="option">
                                                <span className={`${gIcon} mr-2`}>{option.googleIconPrompt}</span>
                                                <p>
                                                    <span className={`${option.redText.includes("preTitle") && "red-text"}`}>{option.preTitle && option.preTitle + " "}</span>
                                                    <span className={`${option.redText.includes("title") && "red-text"}`}>{option.title}</span>
                                                    <span className={`${option.redText.includes("postTitle") && "red-text"}`}>{option.postTitle && " " + option.postTitle}</span>
                                                </p>
                                                {option.subOptions &&
                                                    <span className={`${gIcon} arrow mt-h`}>keyboard_arrow_down</span>
                                                }
                                            </div>
                                        })}
                                    </>
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
}
export default SidePanel;