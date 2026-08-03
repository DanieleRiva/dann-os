import { useEffect } from "react"
import { Engine } from "../core/Engine"

interface StartupSceneProps {
    engine: Engine
}

const StartupScene = ({ engine }: StartupSceneProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            engine.openMenu();
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className='text-white text-[clamp(0.5rem,3cqw,4rem)] font-volter w-full h-full flex flex-col justify-center text-center items-center'
            onClick={() => engine.openMenu()}
        >
            <h1>WARNING!</h1>
            <p>This game contains flashing lights, loud noises, and lots of jumpscares!</p>
            <p className="mt-[3cqw]">This is a faithful web browser recreation of the original game; all credits go to the original creator Scott Cawthon.</p>
        </div>
    )
}

export default StartupScene