"use client"

import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'
import React, { useEffect, useRef, useState } from 'react'
import { Engine } from './core/Engine'

const FNAF = ({ instance }: { instance: WindowInstance }) => {
    const engineRef = useRef<Engine>(null);
    const [currentSceneId, setCurrentSceneId] = useState<string>('main-menu');

    if (!engineRef.current) {
        engineRef.current = new Engine();
    }

    useEffect(() => {
        if (engineRef.current) {
            engineRef.current.init();

            engineRef.current.sceneManager.onSceneChange = (newScene) => {
                setCurrentSceneId(newScene);
            };
        }

        return (() => {
            if (engineRef.current) {
                engineRef.current.destroy();
                engineRef.current.sceneManager.onSceneChange = null;
            }
        });
    }, []);

    const CurrentScene = engineRef.current.sceneManager.getScene();

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

                    <CurrentScene engine={engineRef.current} />

                </div>
            </div>

        </Window>
    )
}

export default FNAF