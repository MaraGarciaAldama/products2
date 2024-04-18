export default function Slider({
    height,
    itemWidth,
    items,
    className
}) {
    
    const renderItem = (child, index) => (
        <div    
            key={index}
            className="h-full absolute"
            style={{left: `${index * (itemWidth + 20)}px`, width: `${itemWidth}px!important`}}
        >
            {child}
        </div>
    )

    return (
        <div className={`${className} w-full block`}>
            <div 
                className="overflow-x-auto w-full relative"
                style={{height: `${height}px`}}
            >
                {items?.map((item, index) => {
                    return renderItem(item, index)
                })}
            </div>
        </div>
    );

}


