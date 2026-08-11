import { useEffect } from "react";
import { Engine } from "../core/Engine";

interface EndGameSceneProps {
    engine: Engine
}

const EndGameScene = ({ engine }: EndGameSceneProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            engine.sceneManager.changeScene('menu');
        }, 15000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <img
            src="/programs/fnaf/office/other/522.png"
            className='
                absolute 
                h-full
                max-w-none
            '
            draggable={false}
        />
    )
}

export default EndGameScene