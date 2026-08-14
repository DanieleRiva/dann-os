'use client'

import React, { useEffect, useRef } from 'react'
import { Engine } from '../core/Engine'

interface OfficeProps {
    engine: Engine
}

const Office = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.sceneManager.officeElements['office'] = localRef.current;
        }

        return () => {
            localRef.current = null;
            engine.sceneManager.officeElements['office'] = null;
        }
    }, [engine]);

    return (
        <img
            ref={localRef}
            src="/programs/fnaf/office/officeInside/126.png"
            className='
                absolute 
                h-full
                max-w-none
            '
            draggable={false}
        />
    )
}

export default Office