"use client"
import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { DraggableData, DraggableEvent } from 'react-draggable'
import GridDisplayer from './gridDisplayer';
import GridCellHighlighter from './gridCellHighlighter';

const preferredCellSize = 80;

const Desktop = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [highlighterPos, setHighlighterPos] = useState<{ x: number, y: number } | null>(null);
    const [grid, setGrid] = useState({ rows: 0, cols: 0, cellWidth: 0, cellHeight: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Utility variables
    const cellIconRatio = 0.5;
    const [showGridDisplayer, setShowGridDisplayer] = useState(false);
    const [showCellHighlighter, setShowCellHighlighter] = useState(true);

    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - 64;

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
            setIsDragging(true);

            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            setHighlighterPos({ x: snappedX, y: snappedY });
        }
    }

    const onDragStop = (e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            setIsDragging(false);

            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            setPos({ x: snappedX, y: snappedY });
        }

        setHighlighterPos(null);
    }

    const onDoubleClick = (e: MouseEvent) => {
        console.log("Double Clicked! This is the event:");
        console.log(e);
    }

    return (
        <main className='relative w-screen h-[calc(100vh-64px)] bg-cover bg-no-repeat bg-[image:var(--desktop-wallpaper)] p-0 overflow-hidden'>

            <GridDisplayer active={showGridDisplayer} grid={grid} />

            <GridCellHighlighter active={showCellHighlighter} grid={grid} highlighterPos={highlighterPos} highlighterColor='bg-gray-700' />

            <Rnd
                size={{ width: grid.cellWidth, height: grid.cellHeight }}
                position={pos}
                onDoubleClick={onDoubleClick}
                onDrag={onDrag}
                onDragStop={onDragStop}
                bounds="parent"
                enableResizing={false}
                className='cursor-pointer z-10'
            >
                <div
                    className={`w-full h-full flex flex-col items-center justify-evenly text-center rounded-lg select-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}>
                    <img
                        src="/icons/programs/notepad.ico"
                        width={grid.cellHeight * cellIconRatio}
                        className='pointer-events-none select-none mx-auto aspect-square'
                        alt="Icona cartella"
                    />

                    <div
                        className="flex items-center justify-center w-full"
                        style={{ height: grid.cellHeight * (1 - cellIconRatio) }}
                    >
                        <span className="select-none text-center">Notepad</span>
                    </div>
                </div>
            </Rnd>

        </main>
    );
};

export default Desktop;