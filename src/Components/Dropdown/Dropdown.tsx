import { useEffect, useRef } from 'react'
import './dropdown.scoped.css'

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
    // handleClick + update parent
    const handleClick = (index: number) => {
        const clickFunction = itemsList[index].clickFunction.function;
        const params = itemsList[index].clickFunction.params;
        clickFunction(...params);
    };

    // useEffect(() => {
    //     console.log(itemsList)
    // }, [])

    return (
        <div ref={dropdownRef} className="dropdown">
            <div className="header"></div>
            {itemsList.map((item, index: number) => {
                return <div
                    key={index}
                    onClick={() => item.clickFunction ? handleClick(index) : null}
                    className="option"
                >
                    <p className="title" style={{ color: item.textColor ?? "" }}>{item.itemName}</p>
                </div>
            })}

        </div>
    )
}
export default Dropdown;