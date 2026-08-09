import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine"

interface OfficeProps {
    engine: Engine
}

const OfficeRightPanel = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.registerNode('officeLeftPanel', localRef.current);
        }
    }, [engine]);

    return (
        <div
            className='
                absolute 
                top-[35%]
                left-[116%]
                h-[45%]
                z-20
            '
        >
            <img
                src="/programs/fnaf/office/doorsAndLights/rLight/134.png"
                className='max-w-none h-full'
                draggable={false}
            />
        </div>
    )
}

export default OfficeRightPanel