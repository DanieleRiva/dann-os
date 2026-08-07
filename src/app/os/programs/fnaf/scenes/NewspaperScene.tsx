import { useEffect } from 'react'
import { Engine } from '../core/Engine'

interface NewspaperSceneProps {
    engine: Engine
}

const NewspaperScene = ({ engine }: NewspaperSceneProps) => {
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
        />
    )
}

export default NewspaperScene