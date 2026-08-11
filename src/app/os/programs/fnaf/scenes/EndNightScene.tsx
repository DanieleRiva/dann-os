import { useEffect } from "react";
import { Engine } from "../core/Engine";

interface EndNightSceneProps {
    engine: Engine
}

const EndNightScene = ({ engine }: EndNightSceneProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (engine.nightManager.getNight() === 5) {
                engine.sceneManager.changeScene('endGame');
            } else {
                engine.continueGame();
            }
        }, 5000);

        return () => clearTimeout(timer);
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