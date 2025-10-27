"use client"

import { useFlyoutStore } from '@/store/useFlyoutStore';
import React, { useEffect, useRef } from 'react'

interface FlyoutProps {
    id: string,
    isOpen: boolean,
    width?: string,
    height?: string,
    position?: { top?: number, bottom?: number, left?: number, right?: number },
    children: React.ReactNode
}

const Flyout = ({
    id,
    isOpen,
    width = "300px",
    height = "500px",
    position = { bottom: 64 },
    children
}: FlyoutProps) => {
    const flyoutRef = useRef<HTMLDivElement>(null);
    const { toggleFlyout, triggerElement } = useFlyoutStore();

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (isOpen && !flyoutRef.current?.contains(e.target as Node) && !triggerElement?.contains(e.target as Node)) {
                toggleFlyout(id);
            }
        }

        window.addEventListener("mousedown", handleOutsideClick);
        return () => window.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen, toggleFlyout]);

    return (
        <div
            className={`absolute overflow-hidden z-20 transition-all duration-400 ${isOpen ? 'max-h-[100vh]' : 'max-h-0'}`}
            style={{
                width: width,
                height: height,
                ...position
            }}
            ref={flyoutRef}>

            <div className='w-full h-full p-3 bg-neutral-800'>
                {children}
            </div>

        </div>
    )
}

export default Flyout