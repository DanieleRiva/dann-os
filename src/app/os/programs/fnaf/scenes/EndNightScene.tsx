import { useEffect } from "react";
import { Engine } from "../core/Engine";

interface EndNightSceneProps {
    engine: Engine
}

const EndNightScene = ({ engine }: EndNightSceneProps) => {
    
    useEffect(() => {
        engine.audio.playSound('bells', 0.75);

        const timerBells = setTimeout(() => {
            engine.audio.playSound('children', 0.75);
        }, 8000);

        const timerNightChange = setTimeout(() => {
            if (engine.nightManager.getNight() === 5) {
                engine.audio.stopAllSounds();
                engine.sceneManager.changeScene('endGame');
            } else {
                engine.continueGame();
            }
        }, 14000);

        return () => {
            clearTimeout(timerBells);
            clearTimeout(timerNightChange);
        };
    }, []);

    return (
        <div className='text-white text-[clamp(0.5rem,5cqw,4rem)] font-volter w-full h-full flex flex-col justify-center items-center'>
            <h1>6:00 AM</h1>
            <h1>
                Night Complete
            </h1>
        </div>
    )
}

export default EndNightScene