import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine";

interface FanProps {
    engine: Engine
}

const Fan = ({ engine }: FanProps) => {
    const fanImgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (fanImgRef.current) {
            engine.sceneManager.officeElements['fan'] = fanImgRef.current;
        }

        return () => {
            engine.sceneManager.officeElements['fan'] = null;
        };
    }, [engine]);

    return (
        <img
            ref={fanImgRef}
            src="/programs/fnaf/office/fan/0.png"
            className='
                absolute
                w-[10.76cqw]
                h-[15.28cqw]
                object-contain
                left-[60.9cqw]
                top-[23.7cqw]
            '
            draggable={false}
        />
    )
}

export default Fan