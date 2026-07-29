'use client'

import React, { useEffect, useRef } from 'react'
import { Engine } from '../engine'

interface OfficeProps {
    engine: Engine
}

const Office = ({ engine }: OfficeProps) => {
    const localRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.registerNode('office', localRef.current);
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