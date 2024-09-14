
import { useEffect, useState } from "react";
import "./loading.scoped.css"

type LoadingProps = {
    open: boolean
    closureDelay: number
    overlayColor?: string
    overlayFillType: "fillElement" | "fullscreen"
}
const Loading = ({ open, closureDelay, overlayColor, overlayFillType }: LoadingProps) => {

    const [faded, setFaded] = useState(true);
    // useEffect(() => {
    //     setFaded(false);
    // }, []);
    useEffect(() => {
        if (open) {
            setFaded(false);
        } else {
            setFaded(true);
        };
    }, [open]);

    return (
        <div className={`overlay-${overlayFillType}`} data-color={overlayColor ?? "whitelite"} data-faded={faded} style={{ transitionDelay: `${open ? 0 : closureDelay}ms`}}>

            <div className="loading-box">
                <span className="line-1"></span>
                <span className="line-2"></span>
                <span className="line-3"></span>
            </div>

        </div>
    )
}
export default Loading;