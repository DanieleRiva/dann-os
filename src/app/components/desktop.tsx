"use client"
import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { DraggableData, DraggableEvent } from 'react-draggable'

const preferredCellSize = 100;

const Desktop = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [highlighterPos, setHighlighterPos] = useState<{ x: number, y: number } | null>(null);
    const [grid, setGrid] = useState({ cols: 0, rows: 0, cellWidth: 120, cellHeight: 120 });

    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - 48;

            const cols = Math.floor(width / preferredCellSize);
            const rows = Math.floor(height / preferredCellSize);

            const cellWidth = width / cols;
            const cellHeight = height / rows;

            setGrid({ cols, rows, cellWidth, cellHeight });
        };

        updateGrid();
        window.addEventListener('resize', updateGrid);

        return () => window.removeEventListener('resize', updateGrid);
    }, []);

    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            setHighlighterPos({ x: snappedX, y: snappedY });
        }
    };

    const onDragStop = (e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            setPos({ x: snappedX, y: snappedY });
        }

        setHighlighterPos(null);
    };

    return (
        <main className='relative w-screen h-[calc(100vh-48px)] bg-cover bg-no-repeat bg-[image:var(--desktop-wallpaper)] p-0 overflow-hidden'>

            {Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
                const x = i % grid.cols;
                const y = Math.floor(i / grid.cols);
                return (
                    <div
                        key={i}
                        className="absolute border border-dashed border-violet-200 pointer-events-none opacity-20"
                        style={{
                            left: x * grid.cellWidth,
                            top: y * grid.cellHeight,
                            width: grid.cellWidth,
                            height: grid.cellHeight,
                        }}
                    />
                );
            })}

            {highlighterPos && (
                <div
                    className="absolute bg-violet-800 opacity-25 rounded-lg"
                    style={{
                        left: highlighterPos.x,
                        top: highlighterPos.y,
                        width: grid.cellWidth,
                        height: grid.cellHeight,
                        pointerEvents: 'none',
                        zIndex: 5
                    }}
                />
            )}

            <Rnd
                size={{ width: grid.cellWidth, height: grid.cellHeight }}
                position={pos}
                onDrag={onDrag}
                onDragStop={onDragStop}
                bounds="parent"
                enableResizing={false}
                className='cursor-pointer z-10'
            >
                <div className='w-full h-full flex flex-col justify-evenly text-center hover:bg-violet-400 rounded-lg'>
                    <img
                        src="/icons/folder2.svg"
                        width={64}
                        height={64}
                        className='pointer-events-none select-none mx-auto'
                        alt="Icona cartella"
                    />
                    <span className='select-none'>Hachiko</span>
                </div>
            </Rnd>

        </main>
    );
};

export default Desktop;