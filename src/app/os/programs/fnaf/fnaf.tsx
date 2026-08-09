"use client"

import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'
import React, { useEffect, useRef, useState } from 'react'
import { Engine } from './core/Engine'

const Fnaf = ({ instance }: { instance: WindowInstance }) => {
    const [engine, setEngine] = useState<Engine>();
    const [currentSceneId, setCurrentSceneId] = useState<string>('main-menu');

    useEffect(() => {
        const engine = new Engine();

        engine.init();
        engine.sceneManager.onSceneChange = (newScene) => {
            setCurrentSceneId(newScene);
        };

        setEngine(engine);

        return (() => {
            engine.destroy();
        });
    }, []);

    if (!engine) {
        return;
    }

    const CurrentScene = engine.sceneManager.getScene();

    return (
        <Window
            id={instance.instanceId}
            title={instance.title}
            icon={instance.icon}
            width="700px"
            height="500px"
            minWidth="300px"
            minHeight="300px"
            canResize={true}
            canMinimize={true}
        >
            <div
                className='
                    w-full 
                    h-full 
                    bg-black 
                    overflow-hidden
                '
            >
                <div
                    className='
                        aspect-video 
                        max-w-full
                        max-h-full 
                        overflow-hidden 
                        relative
                        m-auto
                        top-1/2 
                        -translate-y-1/2
                        font-volter
                        [container-type:inline-size]
                    '
                >

                    <CurrentScene engine={engine} />

                </div>
            </div>

        </Window>
    )
}

export default Fnaf