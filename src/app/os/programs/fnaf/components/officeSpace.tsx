'use client'

import React, { useEffect, useRef } from 'react'
import { Engine } from '../core/Engine'
import Office from './Office'
import OfficeLeftPanel from './OfficeLeftPanel'
import OfficeRightPanel from './OfficeRightPanel'
import FreddyNose from './FreddyNose'
import Fan from './fan'

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

            <FreddyNose engine={engine} />

            <Fan engine={engine} />
        </div>
    )
}

export default OfficeSpace