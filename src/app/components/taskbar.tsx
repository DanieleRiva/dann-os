"use client"

import { useDesktopStore } from "@/store/useDesktopStore";
import { useState } from "react";

const Taskbar = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const { toggleGrid, toggleHighlighter, showCellHighlighter } = useDesktopStore();

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }

    return (
        <footer className='w-full h-16 bg-neutral-800 flex justify-between items-center px-4'>
            <div className="flex justify-center gap-8">
                <button>Start</button>

                taskbar
            </div>

            <div className="flex justify-center items-center gap-4">
                <button className="cursor-pointer" onClick={toggleFullscreen}>⛶</button>
                <button className="cursor-pointer" onClick={toggleGrid}>᎒᎒᎒</button>
                <button className="cursor-pointer flex justify-center items-center" onClick={toggleHighlighter}>
                    {showCellHighlighter ? '▧' : '▢'}
                </button>
            </div>
        </footer>
    )
}

export default Taskbar