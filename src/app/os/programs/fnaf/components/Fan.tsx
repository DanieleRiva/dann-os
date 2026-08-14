import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine";

interface FanProps {
    engine: Engine
}

const Fan = ({ engine }: FanProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.sceneManager.officeElements['fan'] = localRef.current;
        }

        return () => {
            localRef.current = null;
            engine.sceneManager.officeElements['fan'] = null;
        };
    }, [engine]);

    return (
        <img
            ref={localRef}
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