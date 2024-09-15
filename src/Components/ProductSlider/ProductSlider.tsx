import { useContext, useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './productslider.scoped.css'
import { DataContext } from '../../Context/DataProvider';

type ProductSliderProps = {
    products: any
    productType: "console" | "video-game"
    consoleName?: string
    darkCard?: boolean
    gap?: number
    excludedProducts?: string[]
}
const ProductSlider = ({ products, productType, consoleName, darkCard, gap, excludedProducts }: ProductSliderProps) => {
    const { gIcon } = useContext(DataContext);
    const productSliderWindowRef = useRef(null);
    const productSliderInnerRef = useRef(null);
    const [productSliderControls, setProductSliderControls] = useState({
        offset: 0,
        maxOffset: 0,
        windowWidth: null,
        innerWidth: null,
    });
    const productSliderFunctions = {
        pushRight: function () {
            let productSliderControlsCopy = { ...productSliderControls };
            let offset = productSliderControlsCopy.offset;
            let maxOffset = productSliderControlsCopy.maxOffset;
            if (offset < maxOffset) {
                if (offset >= maxOffset - 320) {
                    productSliderControlsCopy.offset = maxOffset;
                } else {
                    productSliderControlsCopy.offset = offset + 320;
                };
            };
            setProductSliderControls(productSliderControlsCopy);
        },
        pushLeft: function () {
            let productSliderControlsCopy = { ...productSliderControls };
            let offset = productSliderControlsCopy.offset;
            if (offset > 0) {
                if (offset <= 320) {
                    productSliderControlsCopy.offset = 0;
                } else {
                    productSliderControlsCopy.offset = offset - 320;
                };
            };
            setProductSliderControls(productSliderControlsCopy);
        },
        updateProductSliderControls: function () {
            let productSliderControlsCopy = { ...productSliderControls };
            let windowWidth = null;
            let innerWidth = null;
            if (productSliderWindowRef.current) {
                windowWidth = productSliderWindowRef.current['clientWidth'];
                productSliderControlsCopy.windowWidth = windowWidth;
            };
            if (productSliderInnerRef.current) {
                innerWidth = productSliderInnerRef.current['scrollWidth'];
                productSliderControlsCopy.innerWidth = innerWidth;
            };
            if (windowWidth && innerWidth) {
                productSliderControlsCopy.maxOffset = innerWidth - windowWidth;
            };
            // console.log(productSliderControlsCopy);
            setProductSliderControls(productSliderControlsCopy);
        },
    };
    useEffect(() => {
        productSliderFunctions.updateProductSliderControls();
        window.addEventListener('resize', productSliderFunctions.updateProductSliderControls, true)
        return () => window.removeEventListener('resize', productSliderFunctions.updateProductSliderControls)
    }, []);


    return (
        <div className="ps-container">
            <button onClick={() => productSliderFunctions.pushLeft()} className="push-left" data-hidden={productSliderControls.offset === 0 ? true : false}>
                <span className={gIcon}>keyboard_arrow_left</span>
            </button>
            <button onClick={() => productSliderFunctions.pushRight()} className="push-right" data-hidden={productSliderControls.offset >= productSliderControls.maxOffset ? true : false}>
                <span className={gIcon}>keyboard_arrow_right</span>
            </button>

            <div ref={productSliderWindowRef} className="ps-window">

                <div ref={productSliderInnerRef} className="ps-inner" style={{ transform: `translateX(-${productSliderControls.offset}px)` }}>

                    <div className="product-slider" style={{ gap: gap ? `${gap}px` : "48px" }}>
                        {products.map((product: any, index: number) => {
                            const excluded = excludedProducts?.includes(product.name);
                            if (excluded) return null;
                            if (productType === "console") {
                                return <ProductCard
                                key={index}
                                index={index}
                                productType="console"
                                console={product}
                                darkCard={darkCard ?? false}
                                />
                            } else if (productType === "video-game") {
                                return <ProductCard
                                key={index}
                                index={index}
                                productType="video-game"
                                game={product}
                                consoleName={consoleName ?? undefined}
                                darkCard={darkCard ?? false}
                                />                                
                            }
                        })}

                    </div>

                </div>
            </div>
        </div>
    )
}
export default ProductSlider;