"use client"

import { useWindowStore } from '@/store/useWindowStore';
import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx';
import { Rnd } from 'react-rnd';

interface WindowProps {
    id: string,
    title?: string,
    icon?: string,
    isOpen: boolean,
    width?: string,
    minWidth?: string,
    height?: string,
    minHeight?: string,
    canResize?: boolean,
    className?: string,
    children: React.ReactNode
}

const Window = ({
    id,
    title = "Window title",
    icon,
    isOpen,
    width = "600px",
    minWidth = "400px",
    height = "400px",
    minHeight = "400px",
    canResize = true,
    className,
    children
}: WindowProps) => {
    const {
        windowPositions,
        setWindowPosition,
        windowSizes,
        setWindowSize,
        minimizeWindow,
        closeWindow,
        focusWindow,
        focusedWindow,
        minimizedWindows
    } = useWindowStore();

    const [isMounted, setIsMounted] = useState(false);

    const initialWidth = windowSizes[id]?.width ?? parseInt(width);
    const initialHeight = windowSizes[id]?.height ?? parseInt(height);

    const initialX = windowPositions[id]?.x ?? (
        typeof window !== "undefined"
            ? (window.innerWidth / 2) - (initialWidth / 2)
            : null
    );
    const initialY = windowPositions[id]?.y ?? (
        typeof window !== "undefined"
            ? (window.innerHeight / 2) - (initialHeight / 2)
            : null
    )

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const isFocused = focusedWindow === id;
    const isMinimized = minimizedWindows.includes(id);
    const zIndex = isFocused ? 21 : 20;

    return (
        <Rnd
            default={{
                x: initialX,
                y: initialY,
                width: initialWidth,
                height: initialHeight
            }}
            minHeight={minHeight}
            minWidth={minWidth}
            onDragStop={(e, d) => setWindowPosition(id, { x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWindowSize(id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height)
                });
                setWindowPosition(id, position);
            }}
            onMouseDown={() => focusWindow(id)}
            enableResizing={canResize}
            dragHandleClassName="window-drag-handle"
            style={{ zIndex }}
            bounds="window"
            className={clsx(
                "absolute transition-opacity duration-200 ease-out flex flex-col",
                "rounded-lg aero-shadow border border-white/40",
                !isMinimized ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            )}
        >
            <div className='flex flex-col w-full h-full bg-blur bg-blur-texture px-2 pb-2 select-none'>
                <div
                    className="h-10 flex items-center justify-between select-none w-full z-20 window-drag-handle"
                    onDoubleClick={() => console.log("Maximize logic")}
                >
                    <div className="flex items-center gap-2 text-white/90 text-lg font-medium shadow-black drop-shadow-md">
                        {icon && <img src={icon} draggable={false} alt="icon" className="w-5 h-5 drop-shadow-sm" />}
                        <span style={{ textShadow: "0px 0px 4px rgba(0,0,0,0.6)" }}>{title}</span>
                    </div>

                    <div className="flex h-full items-start">
                        <button
                            onClick={() => minimizeWindow(id)}
                            className="w-10 h-7 flex justify-center items-center hover:bg-white/20 hover:backdrop-brightness-125 transition-colors group rounded-bl-md border-l-2 border-b-2 border-r-1 border-white/10 cursor-pointer">

                            <div className="w-2.5 h-0.5 bg-white/90 mt-0.5 shadow-sm group-hover:bg-white"></div>
                        </button>

                        <button
                            onClick={() => console.log("Maximize logic")}
                            className="w-10 h-7 flex items-center justify-center hover:bg-white/20 hover:backdrop-brightness-125 transition-colors group border-b-2 border-x-1 border-white/10 cursor-pointer">
                            <div className="w-2.5 h-2.5 border-[1.5px] border-white/90 shadow-sm group-hover:border-white">
                                <div className="border-t-[1.5px] border-white/90 w-full opacity-60"></div>
                            </div>
                        </button>

                        <button
                            onClick={() => closeWindow(id)}
                            className="w-14 h-7 flex items-center justify-center hover:bg-red-500/90 transition-colors group rounded-br-md border-l-1 border-b-2 border-r-2 border-white/10 cursor-pointer"
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={clsx(
                    "flex-1 w-full h-full relative overflow-hidden bg-white text-black",
                    className
                )}>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50 z-10"></div>

                    <div className="w-full h-full p-1">
                        {children}
                    </div>
                </div>
            </div>
        </Rnd>
    )
}

export default Window