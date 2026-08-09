import { useEffect } from "react";
import { Engine } from "../core/Engine"

interface NightSceneProps {
    engine: Engine
}

const NightScene = ({ engine }: NightSceneProps) => {
    let nightText = "";

    if (engine.night === 1) {
        nightText = "st";
    } else if (engine.night === 2) {
        nightText = "nd"
    } else {
        nightText = "th";
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            engine.sceneManager.changeScene('game');
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='text-white text-[clamp(0.5rem,5cqw,4rem)] font-volter w-full h-full flex flex-col justify-center items-center'>
            <h1>12:00 AM</h1>
            <h1>
                {engine.night}{nightText} Night
            </h1>
        </div>
    )
}

export default NightScene