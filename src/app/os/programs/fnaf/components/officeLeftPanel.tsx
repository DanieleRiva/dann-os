import { useEffect, useRef, useState } from "react";
import { Engine } from "../core/Engine"

interface OfficeProps {
    engine: Engine
}

const OfficeLeftPanel = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.sceneManager.officeElements['lPanel'] = localRef.current;
        }

        return (() => {
            localRef.current = null;
            engine.sceneManager.officeElements['lPanel'] = null;
        });
    }, [engine]);

    const doorButton = () => {
        engine.toggleDoor('left');
    }

    const lightButton = () => {
        engine.toggleLight('left');
    }

    return (
        <div
            className='
                absolute 
                top-[35%]
                left-[-1%]
                h-[45%]
                z-20
            '
        >
            <img
                src="/programs/fnaf/office/doorsAndLights/lLight/122.png"
                className='max-w-none h-full'
                draggable={false}
                ref={localRef}
            />

            <div
                className="
                    absolute
                    text-black
                    z-20
                    left-[3cqw]
                    top-[5.5cqw]
                    w-[4cqw]
                    h-[13.5cqw]
                    flex
                    flex-col
                    justify-center
                    gap-[3cqw]
                    bg-yellow-200
                    opacity-0
                    text-center
                "
            >
                <button
                    className="bg-red-300 hover:brightness-150 cursor-pointer w-full flex-1"
                    onClick={doorButton}
                >
                    lDoor
                </button>
                <button
                    className="bg-gray-400 hover:brightness-150 cursor-pointer flex-1"
                    onClick={lightButton}
                >
                    lLight
                </button>
            </div>
        </div>
    )
}

export default OfficeLeftPanel