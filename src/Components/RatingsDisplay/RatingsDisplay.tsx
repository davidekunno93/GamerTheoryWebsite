import { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";
import './ratingsdisplay.scoped.css'

type RatingsDisplayProps = {
    game: any
};

const RatingsDisplay = ({ game }: RatingsDisplayProps) => {
    let ratingsNum = game.rating;
    let ratingsCount = game.ratings_count;

    const { starImgs } = useContext(DataContext);
    const renderRating = (ratingNum: number): number[] => {
        const ratingArr: number[] = [];
        for (let i = 0; i < 5; i++) {
            if (ratingNum >= 1) {
                ratingArr.push(1);
                ratingNum -= 1;
                ratingNum = (Math.round(ratingNum * 10) / 10); // removes awkward recurring numbers
            } else if (ratingNum < 1) {
                if (ratingNum >= 0.8) {
                    ratingArr.push(1);
                } else if (ratingNum <= 0.2) {
                    ratingArr.push(0);
                } else {
                    ratingArr.push(0.5);
                }
                ratingNum = 0;
            }
        }
        return ratingArr;
    };
    return (
        <div className="rating">
            <p className="score-text">{ratingsNum}</p>
            {renderRating(ratingsNum).map((star: number, index: number) => {
                const starRender = star === 0 ? "noStar" : star === 0.5 ? "halfStar" : "fullStar";
                return <img key={index} src={starImgs[starRender]} alt="" className="star-img" />
            })}
            <div className="ratings-count">({ratingsCount})</div>
        </div>
    )
}
export default RatingsDisplay;