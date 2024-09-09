import { useContext } from "react"
import { DataContext } from "../../Context/DataProvider"
import './ratingsdisplay.scoped.css'

type RatingOnlyProps = {
    rating: number
    ratingsCount?: number
}
const RatingOnly = ({ rating, ratingsCount }: RatingOnlyProps) => {
    const { starImgs, numToRating } = useContext(DataContext);

    return (
        <div className="rating">
            {numToRating(rating).map((star: number, index: number) => {
                let starRender = star === 0 ? "noStar" : star === 1 ? "fullStar" : "halfStar"
                return <img key={index} src={starImgs[starRender]} alt="" className="star-img" />
            })}
            {ratingsCount &&
                <p className="ratingsCount">({ratingsCount})</p>
            }
        </div>
    )
}
export default RatingOnly;