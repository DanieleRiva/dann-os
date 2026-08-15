import { useEffect } from 'react'
import { Engine } from '../core/Engine'

interface NewspaperSceneProps {
    engine: Engine
}

const NewspaperScene = ({ engine }: NewspaperSceneProps) => {
    const skipScene = () => {
        engine.sceneManager.changeScene('night');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            engine.sceneManager.changeScene('night');
        }, 12000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <img
            src="/programs/fnaf/staticAndMenu/newspaper/newspaper.png"
            className='
                absolute 
                h-full
                max-w-none
            '
            draggable={false}
            onClick={skipScene}
        />
    )
}

export default NewspaperScene