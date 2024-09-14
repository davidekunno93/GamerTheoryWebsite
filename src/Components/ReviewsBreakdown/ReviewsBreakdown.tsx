import { useContext } from "react";
import { GameProduct, Product } from "../../types"
import { DataContext } from "../../Context/DataProvider";
import './reviewsbreakdown.scoped.css'

type ReviewsBreakdownProps = {
    product: Product & GameProduct
}
const ReviewsBreakdown = ({ product }: ReviewsBreakdownProps) => {
    const { textFunctions, getDotColor } = useContext(DataContext);
    
    return (
        <div className="reviews">
            <div className="legend">
                {Object.entries(product.reviews).map(([opinion, percent], index) => {
                    return <div key={index} className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: getDotColor(opinion) }}></div>
                        <p>{opinion === "notBad" ? "Not bad" : textFunctions.capitalize(opinion)} <span className="gray-text small">({Math.round(percent)}%)</span></p>
                    </div>
                })}
            </div>
            <div className="review-bar">
                {Object.entries(product.reviews).map(([opinion, percent], index) => {
                    return <div key={index} className="portion" data-opinion={opinion} style={{ width: `${percent}%` }}></div>
                })}
            </div>
        </div>
    )
}
export default ReviewsBreakdown;