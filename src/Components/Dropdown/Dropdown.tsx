import { useContext, useEffect, useRef } from 'react'
import './dropdown.scoped.css'
import { DataContext } from '../../Context/DataProvider'

type ItemsListItem = {
    itemName: string,
    gIconPrompt?: string,
    clickFunction: any,
    textColor?: string,
}
type DropdownProps = {
    open: boolean
    itemsList: ItemsListItem[]
    pointerRef?: any
    pointerRefCurrent?: any
    onClose: () => void
}
const Dropdown = ({ open, itemsList, pointerRef, pointerRefCurrent, onClose }: DropdownProps) => {
    if (!open) return null;
    const { starImgs, numToRating } = useContext(DataContext);

    // handleClickOutside w/pointerRef
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hideOnClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            if (!pointerRef || (pointerRef.current && !pointerRef.current.contains(e.target))) {
                if (!pointerRefCurrent || !pointerRefCurrent.contains(e.target)) {
                    console.log(pointerRefCurrent)
                    onClose();
                };
            };
        };
    };
    useEffect(() => {
        window.addEventListener('click', hideOnClickOutside, true)
        return () => window.removeEventListener('click', hideOnClickOutside)
    }, []);

    const handleClick = (index: number) => {
        const clickFunction = itemsList[index].clickFunction.function;
        const params = itemsList[index].clickFunction.params;
        clickFunction(...params);
    };

    const convertItemName = (itemName: string) => {
        if (itemName.includes(":")) {
            let instruction = itemName.split(": ")[0];
            let data = itemName.split(": ")[1];
            if (instruction === "star") {
                return numToRating(parseInt(data));
            };
        };
    };
    


    return (
        <div ref={dropdownRef} className="dropdown">
            <div className="header"></div>
            {itemsList.map((item, index: number) => {
                return <div
                    key={index}
                    onClick={() => item.clickFunction ? handleClick(index) : null}
                    className="option"
                >
                    {item.itemName.includes(":") ?
                        <div className="rating">
                            {convertItemName(item.itemName)?.map((star: number, index: number) => {
                                let starRender = star === 0 ? "noStar" : star === 1 ? "fullStar" : "halfStar"
                                return <img key={index} src={starImgs[starRender]} alt="" className="star-img" />
                            })}
                        </div>
                        :
                        <p className="title" style={{ color: item.textColor ?? "" }}>{item.itemName}</p>
                    }
                </div>
            })}

        </div>
    )
}
export default Dropdown;