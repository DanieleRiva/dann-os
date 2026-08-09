import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine"

interface OfficeProps {
    engine: Engine
}

const OfficeRightPanel = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.registerNode('officeRightPanel', localRef.current);
            engine.sceneManager.officeElements['rPanel'] = localRef.current;
        }

        return (() => {
            engine.sceneManager.officeElements['rPanel'] = null;
        });
    }, [engine]);

    const doorButton = () => {
        engine.toggleDoor('right');
    }

    const lightButton = () => {
        engine.toggleLight('right');
    }

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
                ref={localRef}
            />

            <div
                className="
                    absolute
                    text-black
                    z-20
                    left-[2.25cqw]
                    top-[5.5cqw]
                    w-[4cqw]
                    h-[13.5cqw]
                    flex
                    flex-col
                    justify-center
                    gap-[3cqw]
                    bg-yellow-200
                    opacity-30
                    text-center
                "
            >
                <button
                    className="bg-red-300 hover:brightness-150 cursor-pointer w-full flex-1"
                    onClick={doorButton}
                >
                    rDoor
                </button>
                <button
                    className="bg-gray-400 hover:brightness-150 cursor-pointer flex-1"
                    onClick={lightButton}
                >
                    rLight
                </button>
            </div>
        </div>
    )
}

export default OfficeRightPanel