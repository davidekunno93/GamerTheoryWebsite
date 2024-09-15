
import { useEffect, useState } from "react";
import "./loading.scoped.css"

type LoadingProps = {
    open: boolean
    closureDelay: number
    overlayColor?: string
    overlayFillType: "fillElement" | "fullscreen" 
    loaderPosition?: string
}
const Loading = ({ open, closureDelay, overlayColor, overlayFillType, loaderPosition }: LoadingProps) => {

    const [faded, setFaded] = useState(true);
    useEffect(() => {
        if (open) {
            setFaded(false);
        } else {
            setFaded(true);
        };
    }, [open]);

    return (
        <div className={`overlay-${overlayFillType}`} data-color={overlayColor ?? "whitelite"} data-faded={faded} style={{ transitionDelay: `${open ? 0 : closureDelay}ms`}}>

            <div className="loading-box" style={{ position: loaderPosition as any ?? "absolute" }}>
                <span className="line-1"></span>
                <span className="line-2"></span>
                <span className="line-3"></span>
            </div>

        </div>
    )
}
export default Loading;