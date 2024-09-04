import { useContext } from "react"
import { DataContext } from "../../Context/DataProvider"

type RatingOnlyProps = {
    rating: number
}
const RatingOnly = ({ rating }: RatingOnlyProps) => {
    const { starImgs, numToRating } = useContext(DataContext);

    return (
        <div className="rating">
            {numToRating(rating).map((star: number, index: number) => {
                let starRender = star === 0 ? "noStar" : star === 1 ? "fullStar" : "halfStar"
                return <img key={index} src={starImgs[starRender]} alt="" className="star-img" />
            })}
        </div>
    )
}
export default RatingOnly;