import { ChangeEvent, useEffect, useState } from 'react';
import './searchbar.scoped.css'
import { SearchBarProps } from '../../types';



const SearchBar = ({ width, placeholder }: SearchBarProps) => {
    const [searchText, setSearchText] = useState<string>("");
    useEffect(() => {
        // console.log(searchText);
    }, [searchText]);
    
    return (
        <div className="inputBox-container">
            <div className="inputBox" style={{ width: width ?? "" }}>
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    type="text"
                    className="input-primary"
                    placeholder={`${placeholder ?? 'What can we help you find?'}`}
                />
                <span className="material-symbols-outlined left-icon">search</span>
            </div>
        </div>
    )
}
export default SearchBar;