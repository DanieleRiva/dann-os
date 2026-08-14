import { Engine } from "../core/Engine";

interface EndGameSceneProps {
    engine: Engine
}

const EndGameScene = ({ engine }: EndGameSceneProps) => {
    const returnToMenu = () => {
        engine.sceneManager.changeScene('menu');
    }

    return (
        <img
            onClick={returnToMenu}
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