"use client"
import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { DraggableData, DraggableEvent } from 'react-draggable'
import GridDisplayer from './gridDisplayer';
import GridCellHighlighter from './gridCellHighlighter';
import { useDesktopStore } from '@/store/useDesktopStore';

interface FileSystemItem {
    id: number,
    name: string,
    icon: string,
    alt: string,
    row: number | "top" | "bottom",
    column: number | "left" | "right",
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
    const { showGridDisplayer, showCellHighlighter } = useDesktopStore();

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

    // Get items positions from localStorage or from the JSON file 
    useEffect(() => {
        if (grid.cellWidth === 0 || grid.cellHeight === 0 || fileSystem.length === 0) return;

        const localStoredPositions = localStorage.getItem("desktopPositions");
        let loadedPositions: Record<number, { x: number; y: number }> = {};

        if (localStoredPositions)
            loadedPositions = JSON.parse(localStoredPositions);

        // Remove items from localStorage that are no longer in the JSON
        loadedPositions = Object.fromEntries(
            Object.entries(loadedPositions).filter(([id]) =>
                fileSystem.some(item => item.id === Number(id))
            )
        );

        fileSystem.forEach(item => {
            // Check if there is a new item from the JSON
            if (!loadedPositions[item.id]) {
                // Calculate rows and cols based on special positionings from the JSON
                let targetRow: number;
                let targetCol: number;

                if (item.row === "top") targetRow = 0;
                else if (item.row === "bottom") targetRow = grid.rows - 1;
                else targetRow = item.row;

                if (item.column === "left") targetCol = 0;
                else if (item.column === "right") targetCol = grid.cols - 1;
                else targetCol = item.column;

                const jsonX = targetCol * grid.cellWidth;
                const jsonY = targetRow * grid.cellHeight;

                // If the new items should be in an occupied cell, find the first
                // empty spot available
                const occupied = Object.values(loadedPositions).some(pos => pos.x === jsonX && pos.y === jsonY);
                if (!occupied) {
                    loadedPositions[item.id] = { x: jsonX, y: jsonY };
                    return;
                }

                outerLoop:
                for (let r = 0; r < grid.rows; r++) {
                    for (let c = 0; c < grid.cols; c++) {
                        const x = c * grid.cellWidth;
                        const y = r * grid.cellHeight;

                        if (!Object.values(loadedPositions).some(pos => pos.x === x && pos.y === y)) {
                            loadedPositions[item.id] = { x, y };
                            break outerLoop;
                        }
                    }
                }
            }
        });

        setPositions(loadedPositions);
    }, [grid, fileSystem]);


    const onDrag = (itemId: number, e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            setIsDragging(true);

            const pointerX = e.clientX;
            const pointerY = e.clientY;

            const snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;
            const snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;

            setHighlighterPos({ x: snappedX, y: snappedY });
        }
    }

    const onDragStop = (itemId: number, e: DraggableEvent, data: DraggableData) => {
        if ('clientX' in e) {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            let snappedY = Math.floor(pointerY / grid.cellHeight) * grid.cellHeight;
            let snappedX = Math.floor(pointerX / grid.cellWidth) * grid.cellWidth;

            // Prevent from dragging onto an occupied cell
            for (const [, position] of Object.entries(positions)) {
                if (position.x === snappedX && position.y === snappedY) {
                    setIsDragging(false);
                    setHighlighterPos(null);
                    return;
                }
            }

            // Copy all of the previous positions and update the dragged item's
            setPositions(prevState => {
                const newPositions = {
                    ...prevState,
                    [itemId]: {
                        x: snappedX,
                        y: snappedY
                    }
                };

                // Save in localStorage
                localStorage.setItem("desktopPositions", JSON.stringify(newPositions));
                return newPositions;
            });
        }

        setIsDragging(false);
        setHighlighterPos(null);
    }

    const onDoubleClick = (e: MouseEvent) => {
        console.log("Double Clicked! This is the event:");
        console.log(e);
    }

    function specialPositionings(value: number, axis: "x" | "y"): number | string {
        if (axis === "x") return value === grid.cols - 1 ? "right" : value;
        if (axis === "y") return value === grid.rows - 1 ? "bottom" : value;
        return value;
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
                    className='cursor-pointer z-10'
                >
                    <div
                        className={`w-full h-full flex flex-col items-center justify-evenly text-center rounded-lg select-none p-2 ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}>
                        <img
                            src={item.icon || "https://placehold.co/ffffff/000000?text=NaN"}
                            width={grid.cellHeight * cellIconRatio}
                            className='pointer-events-none select-none mx-auto aspect-square'
                            alt={item.alt}
                        />

                        <div
                            className="flex items-center justify-center w-full"
                            style={{ height: grid.cellHeight * (1 - cellIconRatio) }}
                        >
                            <span className="select-none text-center [text-shadow:.3px_.3px_0_black,_-.3px_.3px_0_black,_.3px_-.3px_0_black,_-.3px_-.3px_0_black] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.name}</span>
                        </div>
                    </div>
                </Rnd>
            ))}

        </main>
    );
};

export default Desktop;