import { Fade } from 'react-awesome-reveal';
import './sidepanel.scoped.css'
import { useContext, useEffect, useRef, useState } from 'react';
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
                },
                {
                    title: "Pokemon Cards",
                    preTitle: "NEW!",
                    postTitle: null,
                    redText: ["preTitle"],
                    googleIconPrompt: "star",
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

    // const optionContainerRefs = useRef([]);
    const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null);
    const optionContainerFunctions = {
        expand: function (id: string) {
            const container: HTMLElement | null = document.getElementById(`optionContainer-${id}`);
            const subOptions: HTMLElement | null = document.getElementById(`subOptions-${id}`);
            let expandedHeight = 0;
            if (subOptions) {
                expandedHeight = subOptions?.clientHeight + 56;
                subOptions.classList.replace('hide', 'show');
            }
            if (container) {
                container.style.height = expandedHeight.toString() + "px";
            }
            console.log(id)
            setSelectedSubOption(id);
            for (let i=0; i<panelOptions.length; i++) {
                for (let j=0; j<panelOptions[i].options.length; j++) {
                    let subOption_id = i.toString()+j.toString();
                    if (id !== subOption_id) {
                        console.log(subOption_id)
                        optionContainerFunctions.collapse(subOption_id);
                    };
                }
            }
        },
        collapse: function (id: string) {
            const container: HTMLElement | null = document.getElementById(`optionContainer-${id}`);
            const subOptions: HTMLElement | null = document.getElementById(`subOptions-${id}`);
            if (subOptions) {
                subOptions.classList.replace('show', 'hide');
            }
            if (container) {
                container.style.height = "56px";
            }
            
        },
        toggle: function (id: string) {
            const subOptions: HTMLElement | null = document.getElementById(`subOptions-${id}`);
            if (subOptions?.classList.contains('show')) {
                optionContainerFunctions.collapse(id);
                setSelectedSubOption(null);
            } else {
                optionContainerFunctions.expand(id);
            }
        }
    }

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
                            <div className="sub-head pointer">
                                <div className="text">
                                    <p className='title'>Hi, User</p>
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
                                            let id: string = i.toString()+j.toString();
                                            let isSelected = selectedSubOption === id;
                                            return <div
                                                key={id}
                                                id={`optionContainer-${id}`}
                                                // ref={(e: HTMLDivElement) => optionContainerRefs.current[id] = e}
                                                className="option-container"
                                            >
                                                <div onClick={() => option.subOptions && optionContainerFunctions.toggle(id)} className={`option ${isSelected && "selected"}`}>
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
                                                <div id={`subOptions-${id}`} className="sub-options hide">
                                                    {option.subOptions?.map((subOption, k) => {
                                                        return <div key={k} className="sub-option">
                                                            <p>{subOption.title}</p>
                                                        </div>
                                                    })}

                                                </div>
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