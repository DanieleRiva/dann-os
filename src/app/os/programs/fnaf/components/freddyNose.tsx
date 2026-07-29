'use client'

import { Engine } from "../engine"

interface FreddyNoseProps {
    engine: Engine
}

const FreddyNose = ({ engine }: FreddyNoseProps) => {
    const honkNose = () => {
        engine.honkFreddysNose();
    }

    return (
        <button
            onClick={honkNose}
            className='
                p-0
              bg-gray-500 
                rounded-full 
                absolute 
                top-[32.5%] 
                left-[52.2%]
                cursor-pointer
                opacity-0
            '
        >
            🐻
        </button>
    )
}

export default FreddyNose