import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine"

interface OfficeProps {
    engine: Engine
}

const OfficeLeftPanel = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.registerNode('officeLeftPanel', localRef.current);
        }
    }, [engine]);

    return (
        <div
            ref={localRef}
            className='
                absolute 
                top-[35%]
                left-[-1%]
                h-[45%]
            '
        >
            <img
                src="/programs/fnaf/office/doorsAndLights/lLight/122.png"
                className='max-w-none h-full'
                draggable={false}
            />
        </div>
    )
}

export default OfficeLeftPanel