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
    openMaximized?: boolean,
    openFullscreen?: boolean,
    canResize?: boolean,
    canMinimize?: boolean,
    canFullscreen?: boolean,
    className?: string,
    children: React.ReactNode
}

const Window = ({
    id,
    title = "Window title",
    icon,
    width = "600px",
    minWidth = "400px",
    height = "400px",
    minHeight = "400px",
    openMaximized,
    openFullscreen,
    canResize = true,
    canMinimize = true,
    canFullscreen = true,
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
    const [lastWindowState, setLastWindowState] = useState<{ width: number, height: number, x: number, y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

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

    useEffect(() => {
        if (isMounted && openMaximized) {
            if (isMaximized())
                return;

            setLastWindowState({
                width: parseInt(width),
                height: parseInt(height),
                x: (window.innerWidth / 2) - (parseInt(width) / 2),
                y: (window.innerHeight / 2) - (parseInt(height) / 2)
            });

            toggleMaximize();
        }
    }, [isMounted, openMaximized]);


    if (!isMounted) return null;


    const currentWidth = windowSizes[id]?.width ?? parseInt(width);
    const currentHeight = windowSizes[id]?.height ?? parseInt(height);

    const currentX = windowPositions[id]?.x ?? (typeof window !== "undefined" ? (window.innerWidth / 2) - (currentWidth / 2) : 0);
    const currentY = windowPositions[id]?.y ?? (typeof window !== "undefined" ? (window.innerHeight / 2) - (currentHeight / 2) : 0);

    const isFocused = focusedWindow === id;
    const isMinimized = minimizedWindows.includes(id);
    const zIndex = isFocused ? 21 : 20;

    const isMaximized = () => {
        if (currentWidth === window.innerWidth &&
            currentHeight === window.innerHeight - 64 &&
            currentX === 0 &&
            currentY === 0
        ) return true;
        return false;
    }

    function toggleMaximize() {
        if (!isMaximized()) {
            setLastWindowState({
                x: currentX,
                y: currentY,
                width: currentWidth,
                height: currentHeight,
            })

            setWindowSize(
                id,
                { width: window.innerWidth, height: window.innerHeight - 64 }
            );

            setWindowPosition(
                id,
                { x: 0, y: 0 }
            );
        } else if (lastWindowState) {
            setWindowSize(
                id,
                { width: lastWindowState.width, height: lastWindowState.height }
            );

            setWindowPosition(
                id,
                { x: lastWindowState.x, y: lastWindowState.y }
            );
        }
    }

    return (
        <Rnd
            position={{
                x: initialX ?? 0,
                y: initialY ?? 0
            }}
            size={{
                width: initialWidth,
                height: initialHeight
            }}
            minHeight={minHeight}
            minWidth={minWidth}
            onDragStart={() => setIsDragging(true)}
            onDragStop={(e, d) => {
                setWindowPosition(id, { x: d.x, y: d.y });
                setIsDragging(false);
            }}
            onResizeStart={() => {
                focusWindow(id);
                setIsResizing(true);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWindowSize(id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height)
                });
                setWindowPosition(id, position);
                setIsResizing(false);
            }}
            onMouseDown={() => focusWindow(id)}
            enableResizing={canResize}
            dragHandleClassName="window-drag-handle"
            style={{ zIndex }}
            bounds="window"
            className={
                clsx(
                    "absolute flex flex-col",
                    "rounded-lg border border-white/40",
                    (focusedWindow === id) && "aero-shadow",
                    !isMinimized ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
                    !isDragging && !isResizing ? "transition-all" : "transition-opacity",
                    // Se è massimizzata, rimuoviamo i bordi arrotondati
                    isMaximized() && "!rounded-none !border-none"
                )
            }
        >
            <div className={clsx(
                'flex flex-col w-full h-full bg-blur bg-blur-texture px-2 pb-2 select-none',
                // Rimuoviamo padding/rounded interni se massimizzata per farla sembrare nativa
                isMaximized() ? "" : "rounded-lg"
            )}>
                <div
                    className={clsx(
                        "h-10 flex items-center justify-between select-none w-full z-20 window-drag-handle",
                        !isDragging ? "cursor-grab" : "cursor-grabbing"
                    )}
                    onDoubleClick={() => { canResize && toggleMaximize() }}
                >
                    <div className="flex items-center gap-2 text-white/90 text-lg font-medium shadow-black drop-shadow-md">
                        {icon && <img src={icon} draggable={false} alt="icon" className="w-5 h-5 drop-shadow-sm" />}
                        <span style={{ textShadow: "0px 0px 4px rgba(0,0,0,0.6)" }}>{title}</span>
                    </div>

                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className="flex h-full items-start"
                    >
                        {canMinimize && <button
                            onClick={() => minimizeWindow(id)}
                            className="w-10 h-7 flex justify-center items-center hover:bg-white/20 hover:backdrop-brightness-125 transition-colors group rounded-bl-md border-l-2 border-b-2 border-r-1 border-white/10 cursor-pointer">

                            <div className="w-2.5 h-0.5 bg-white/90 mt-0.5 shadow-sm group-hover:bg-white"></div>
                        </button>}

                        {canResize && <button
                            onClick={() => toggleMaximize()}
                            className={clsx(
                                "w-10 h-7 flex items-center justify-center hover:bg-white/20 hover:backdrop-brightness-125 transition-colors group border-b-2 border-x-1 border-white/10 cursor-pointer",
                                canMinimize ? "" : "rounded-bl-md")
                            }>
                            <div className="w-2.5 h-2.5 border-[1.5px] border-white/90 shadow-sm group-hover:border-white">
                                <div className="border-t-[1.5px] border-white/90 w-full opacity-60"></div>
                            </div>
                        </button>}

                        <button
                            onClick={() => closeWindow(id)}
                            className={clsx(
                                "w-14 h-7 flex items-center justify-center hover:bg-red-500/90 transition-colors group rounded-br-md border-l-1 border-b-2 border-r-2 border-white/10 cursor-pointer",
                                (!canResize && !canMinimize) && "rounded-bl-md")
                            }>
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
        </Rnd >
    )
}

export default Window