import { useEffect, useRef } from "react"
import { Engine } from "../core/Engine"

interface LeftDoorProps {
    engine: Engine
}

const LeftDoor = ({ engine }: LeftDoorProps) => {
    const leftDoorImgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (leftDoorImgRef.current) {
            engine.sceneManager.officeElements['l-door'] = leftDoorImgRef.current;
        }

        return () => {
            engine.sceneManager.officeElements['l-door'] = null;
        };
    }, [engine]);

    return (
        <img
            ref={leftDoorImgRef}
            src="/programs/fnaf/office/doorsAndLights/lDoor/0.png"
            className='
                absolute
                h-full
                left-[6cqw]
                z-10
                max-w-none
                opacity-0
            '
            draggable={false}
        />
    )
}

export default LeftDoor