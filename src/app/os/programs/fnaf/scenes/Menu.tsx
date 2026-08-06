import { useEffect, useRef } from 'react';
import { Engine } from '../core/Engine'

interface MenuProps {
    engine: Engine
}

const Menu = ({ engine }: MenuProps) => {
    const freddyImgRef = useRef<HTMLImageElement>(null);
    const staticFullImgRef = useRef<HTMLImageElement>(null);
    const freddyImgFrames = '/programs/fnaf/staticAndMenu/menu/';

    useEffect(() => {
        if (freddyImgRef.current) {
            engine.sceneManager.menuElements['freddy-menu'] = freddyImgRef.current;
            engine.sceneManager.menuElements['static-full'] = staticFullImgRef.current;
        }

        return () => {
            engine.sceneManager.menuElements['freddy-menu'] = null;
            engine.sceneManager.menuElements['static-full'] = null;
        };
    }, [engine]);

    return (
        <div className='text-white text-left w-full h-full relative overflow-hidden bg-black [container-type:inline-size]'>
            <div className='absolute top-0 left-0 w-full h-full z-0 pointer-events-none'>
                <img
                    src="/programs/fnaf/staticAndMenu/menu/0.png"
                    ref={freddyImgRef}
                    className='
                        absolute 
                        top-0 
                        left-0 
                        w-full 
                        h-full 
                        object-cover 
                        opacity-75
                    '
                    draggable={false}
                />
                <img
                    src="/programs/fnaf/staticAndMenu/fullStatic/0.png"
                    ref={staticFullImgRef}
                    className='
                        absolute 
                        top-0 
                        left-0 
                        w-full 
                        h-full 
                        object-cover 
                        opacity-20
                        mix-blend-screen
                    '
                    draggable={false}
                />
            </div>

            <div className='relative flex flex-col z-10 w-full h-full px-[15cqw] py-[7cqw] text-[clamp(0.5rem,4cqw,4rem)] gap-[5cqw]'
            >
                <h1>
                    Five Nights at <br />
                    Freddy's - Remake
                </h1>

                <div
                    className='relative z-10 w-full h-full flex flex-col gap-[1cqw] items-start text-[clamp(0.5rem,2.5cqw,3rem)]'
                >
                    <button
                        className='cursor-pointer group relative'
                        onClick={() => engine.startNewGame()}
                    >
                        New Game
                        <span className='absolute -left-[5cqw] opacity-0 group-hover:opacity-100'>{">>"}</span>
                    </button>

                    <button className='cursor-pointer group relative flex flex-col'
                        onClick={() => engine.quickGame()}
                    >
                        Continue
                        <span className='text-[clamp(0.5rem,1.5cqw,4rem)] text-start opacity-0 group-hover:opacity-100' >Night 3</span>

                        <span className='absolute -left-[5cqw] opacity-0 group-hover:opacity-100'>{">>"}</span>
                    </button>

                    <button className='cursor-pointer group relative'>
                        6th Night
                        <span className='absolute -left-[5cqw] opacity-0 group-hover:opacity-100'>{">>"}</span>
                    </button>

                    <button className='cursor-pointer group relative'>
                        Extras
                        <span className='absolute -left-[5cqw] opacity-0 group-hover:opacity-100'>{">>"}</span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Menu