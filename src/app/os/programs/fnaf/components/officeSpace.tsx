'use client'

import React, { useEffect, useRef } from 'react'
import { Engine } from '../engine'
import Office from './office'
import OfficeLeftPanel from './officeLeftPanel'
import OfficeRightPanel from './officeRightPanel'

interface OfficeSpaceProps {
    engine: Engine
}

const OfficeSpace = ({ engine }: OfficeSpaceProps) => {
    const localRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localRef.current) {
            engine.registerNode('officeSpace', localRef.current);
        }
    }, [engine]);

    return (
        <div
            ref={localRef}
            className='relative w-full h-full'
        >
            <Office engine={engine} />

            <OfficeLeftPanel engine={engine} />
            <OfficeRightPanel engine={engine} />
        </div>
    )
}

export default OfficeSpace