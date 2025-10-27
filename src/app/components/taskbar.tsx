"use client"

import { useDesktopStore } from "@/store/useDesktopStore";
import { useFlyoutStore } from "@/store/useFlyoutStore";
import { useEffect, useState } from "react";

const Taskbar = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const { showGridDisplayer, toggleGrid, showCellHighlighter, toggleHighlighter } = useDesktopStore();
    const { activeFlyout, toggleFlyout } = useFlyoutStore();

    useEffect(() => {

    }, []);

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
        <footer className='w-full z-30 h-16 flex justify-between items-center px-4 bg-blur-effect'>

            <div className="flex justify-center gap-8">
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("start", e.currentTarget)}
                >
                    <img src="/icons/shell/windows.png" width={32} height={32} alt="Logo" />
                </button>

                {/* taskbar */}
            </div>

            <div className="flex justify-center items-center gap-4">
                <button className="cursor-pointer" onClick={toggleFullscreen}>
                    {fullscreen ? '🗗' : '⛶'}
                </button>
                <button className="cursor-pointer" onClick={toggleGrid}>
                    {showGridDisplayer ? '᎒᎒᎒' : '⧠'}
                </button>
                <button className="cursor-pointer flex justify-center items-center" onClick={toggleHighlighter}>
                    {showCellHighlighter ? '▣' : '▢'}
                </button>
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("calendar", e.currentTarget)}
                >
                    Calendar
                </button>
            </div>

        </footer>
    )
}

export default Taskbar