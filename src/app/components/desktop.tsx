"use client"
import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { DraggableData, DraggableEvent } from 'react-draggable'
import GridDisplayer from './gridDisplayer';
import GridCellHighlighter from './gridCellHighlighter';

interface FileSystemItem {
    id: number,
    name: string,
    icon: string,
    alt: string,
    row: number,
    column: number,
    componentPath: string
}

const preferredCellSize = 80;

const Desktop = () => {
    const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([]);
    const [positions, setPositions] = useState<Record<number, { x: number, y: number }>>({});
    const [highlighterPos, setHighlighterPos] = useState<{ x: number, y: number } | null>(null);
    const [grid, setGrid] = useState({ rows: 0, cols: 0, cellWidth: 0, cellHeight: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Utility variables
    const cellIconRatio = 0.5;
    const [showGridDisplayer, setShowGridDisplayer] = useState(false);
    const [showCellHighlighter, setShowCellHighlighter] = useState(true);


    // Fetch the fileSystem JSON file
    useEffect(() => {
        fetch("/os/fileSystem.json")
            .then((res) => res.json())
            .then((data: FileSystemItem[]) => setFileSystem(data))
            .catch((err) => console.error("Error trying to load the fileSystem: ", err));
    }, []);

    // Setup the Desktop grid
    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight - 64; // 64px of taskbar

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

    // Get items positions from the JSON file
    useEffect(() => {
        if (grid.cellWidth === 0 || grid.cellHeight === 0 || fileSystem.length === 0) return;

        const fileSystemPositions = fileSystem.reduce((accumulator: any, item) => {
            accumulator[item.id] = {
                x: item.column * grid.cellWidth,
                y: item.row * grid.cellHeight
            };

            return accumulator;
        }, {} as Record<number, { x: number, y: number }>);

        setPositions(fileSystemPositions);
    }, [grid, fileSystem]);

    const onDrag = (itemId: number, e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            setIsDragging(true);

            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            setHighlighterPos({ x: snappedX, y: snappedY });
        }
    }

    const onDragStop = (itemId: number, e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;
            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;

            // Iterate 
            for (const [, position] of Object.entries(positions)) {
                if (position.x === snappedX && position.y === snappedY) {
                    setIsDragging(false);
                    setHighlighterPos(null);
                    return;
                }
            }

            // Copy all of the previous positions and update the dragged item's
            setPositions(prevState => ({
                ...prevState,
                [itemId]: { x: snappedX, y: snappedY }
            }));
        }

        setIsDragging(false);
        setHighlighterPos(null);
    }

    const onDoubleClick = (e: MouseEvent) => {
        console.log("Double Clicked! This is the event:");
        console.log(e);
    }

    if (Object.keys(positions).length === 0)
        return (
            <main className='relative w-screen h-[calc(100vh-64px)] bg-cover bg-no-repeat bg-[image:var(--desktop-wallpaper)] flex justify-center items-center overflow-hidden'>
                <span className='bg-gray-700 text-white rounded-lg p-4'>
                    Loading DANNos...
                </span>
            </main>
        );

    return (
        <main className='relative w-screen h-[calc(100vh-64px)] bg-cover bg-no-repeat bg-[image:var(--desktop-wallpaper)] overflow-hidden'>

            <GridDisplayer active={showGridDisplayer} grid={grid} />

            <GridCellHighlighter active={showCellHighlighter} grid={grid} highlighterPos={highlighterPos} highlighterColor='bg-gray-700' />

            {fileSystem.map(item => (
                <Rnd
                    key={item.id}
                    size={{ width: grid.cellWidth, height: grid.cellHeight }}
                    position={positions[item.id]}
                    onDoubleClick={onDoubleClick}
                    onDrag={(e, data) => onDrag(item.id, e, data)}
                    onDragStop={(e, data) => onDragStop(item.id, e, data)}
                    bounds="parent"
                    enableResizing={false}
                    className='cursor-pointer z-10 p-2'
                >
                    <div
                        className={`w-full h-full flex flex-col items-center justify-evenly text-center rounded-lg select-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}>
                        <img
                            src={item.icon || "/icons/default.svg"}
                            width={grid.cellHeight * cellIconRatio}
                            className='pointer-events-none select-none mx-auto aspect-square'
                            alt="Icona cartella"
                        />

                        <div
                            className="flex items-center justify-center w-full"
                            style={{ height: grid.cellHeight * (1 - cellIconRatio) }}
                        >
                            <span className="select-none text-center">{item.name}</span>
                        </div>
                    </div>
                </Rnd>
            ))}

            {/* <Rnd
                size={{ width: grid.cellWidth, height: grid.cellHeight }}
                position={positions}
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
            </Rnd> */}

        </main>
    );
};

export default Desktop;