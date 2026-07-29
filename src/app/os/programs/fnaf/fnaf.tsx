"use client"

import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'
import React, { useEffect, useRef } from 'react'
import { Animator } from './animator'
import { Engine } from './engine'
import OfficeLeftPanel from './components/officeLeftPanel'
import OfficeRightPanel from './components/officeRightPanel'
import Office from './components/office'
import OfficeSpace from './components/officeSpace'

const FNAF = ({ instance }: { instance: WindowInstance }) => {
    const engineRef = useRef<Engine>(null);
    const animatorRef = useRef<Animator>(null);

    if (!engineRef.current) {
        engineRef.current = new Engine();
    }

    if (!animatorRef.current) {
        animatorRef.current = new Animator(engineRef.current);
    }

    useEffect(() => {
        if (engineRef.current && animatorRef.current) {
            animatorRef.current.init();
        }

        return (() => {
            if (engineRef.current) {
                engineRef.current.destroy();
            }

            if (animatorRef.current) {
                animatorRef.current.destroy();
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

        console.log("X: " + engineRef.current.mouseX + " Y:" + engineRef.current.mouseY);
        console.log(engineRef.current.nodes);
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
                        
                        border-2
                        border-red-500 
                    '
                >
                    <OfficeSpace engine={engineRef.current} />
                </div>
            </div>

        </Window>
    )
}

export default FNAF