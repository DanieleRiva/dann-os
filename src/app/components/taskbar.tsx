"use client"

import { useState } from "react";

const Taskbar = () => {
    const [fullscreen, setFullscreen] = useState(false);

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
            <button>Start</button>

            taskbar

            <button className="cursor-pointer" onClick={toggleFullscreen}>⛶</button>
        </footer>
    )
}

export default Taskbar