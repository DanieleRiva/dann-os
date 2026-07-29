"use client"

import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'
import React, { useEffect, useRef } from 'react'
import { Engine } from './engine'
import OfficeSpace from './components/officeSpace'

const FNAF = ({ instance }: { instance: WindowInstance }) => {
    const engineRef = useRef<Engine>(null);

    if (!engineRef.current) {
        engineRef.current = new Engine();
    }

    useEffect(() => {
        if (engineRef.current) {
            engineRef.current.init();
        }

        return (() => {
            if (engineRef.current) {
                engineRef.current.destroy();
            }
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!engineRef.current) {
            return;
        }

        const windowSize = e.currentTarget.getBoundingClientRect();
        const mouseX = Number(
            (
                (e.clientX - windowSize.left) / windowSize.width
            ).toFixed(2)
        );
        const mouseY = Number(
            (
                (e.clientY - windowSize.top) / windowSize.height
            ).toFixed(2)
        );
        engineRef.current.updateMousePosition(mouseX, mouseY);
    }

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
                    id='mainGame'
                    onMouseMove={handleMouseMove}
                    className='
                        aspect-video 
                        max-w-full
                        max-h-full 
                        overflow-hidden 
                        relative
                        m-auto
                        top-1/2 
                        -translate-y-1/2
                    '
                >
                    <OfficeSpace engine={engineRef.current} />
                </div>
            </div>

        </Window>
    )
}

export default FNAF