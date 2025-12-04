"use client"

import { useDesktopStore } from "@/store/useDesktopStore";
import { useFlyoutStore } from "@/store/useFlyoutStore";
import { useEffect, useState } from "react";
import TaskbarButton from "./taskbarButton";

const Taskbar = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const { showGridDisplayer, toggleGrid, showCellHighlighter, toggleHighlighter } = useDesktopStore();
    const { toggleFlyout } = useFlyoutStore();

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
        <footer className='w-full z-30 h-16 flex justify-between items-center px-0 bg-blur bg-blur-texture absolute bottom-0'>

            <div className="flex justify-center gap-8">

                <TaskbarButton
                    icon="/icons/shell/logo.png"
                    iconHover="/icons/shell/logoBloom.png"
                    width={72} height={72}
                    onClick={(e) => toggleFlyout("start", e.currentTarget)}
                    alt="Logo"
                />

                {/* <TaskbarButton
                    icon="/icons/shell/logo.png"
                    width={72} height={72}
                    onClick={(e) => toggleFlyout("volume", e.currentTarget)}
                    alt="Logo"
                /> */}

                {/* taskbar */}
            </div>

            <div className="flex justify-center items-center gap-4">
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("notification", e.currentTarget)}
                >
                    🕭
                </button>
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("volume", e.currentTarget)}
                >
                    🕪
                </button>
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