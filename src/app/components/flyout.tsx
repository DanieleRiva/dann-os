import React from 'react'

interface FlyoutProps {
    isOpen: boolean,
    width?: number,
    height?: number,
    position?: { top?: number, bottom?: number, left?: number, right?: number },
    children: React.ReactNode
}

const Flyout = ({
    isOpen,
    width = 300,
    height = 500,
    position = { bottom: 64 },
    children
}: FlyoutProps) => {
    return (
        <div
            className={`w-[${width}px] h-[${height}px] z-10 bg-red-500 ${isOpen ? 'absolute' : 'hidden'}`}
            style={{
                width,
                height,
                ...position
            }}>
            {children}
        </div>
    )
}

export default Flyout