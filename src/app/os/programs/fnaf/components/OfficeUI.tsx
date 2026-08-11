import { useEffect, useRef } from "react";
import { Engine } from "../core/Engine"

interface OfficeUIProps {
    engine: Engine
}

const OfficeUI = ({ engine }: OfficeUIProps) => {
    const hourRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (hourRef.current) {
            engine.sceneManager.officeElements['hourUI'] = hourRef.current;
        }

        return (() => {
            hourRef.current = null;
            engine.sceneManager.officeElements['hourUI'] = null;
        });
    }, [engine]);

    return (
        <div
            className='
                text-white
                absolute
                top-[2cqw]
                right-[2cqw]
                flex flex-col items-center
            '
        >
            <span className="text-[2.5cqw]" ref={hourRef}>12 AM</span>
            <span className="text-[1.25cqw]">Night {engine.nightManager.getNight()}</span>
        </div>
    )
}

export default OfficeUI