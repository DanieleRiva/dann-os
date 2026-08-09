import { useEffect, useRef } from "react"
import { Engine } from "../core/Engine"

interface LeftDoorProps {
    engine: Engine
}

const LeftDoor = ({ engine }: LeftDoorProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.sceneManager.officeElements['lDoor'] = localRef.current;
        }

        return () => {
            localRef.current = null;
            engine.sceneManager.officeElements['lDoor'] = null;
        };
    }, [engine]);

    return (
        <img
            ref={localRef}
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