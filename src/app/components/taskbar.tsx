"use client"

import { useDesktopStore } from "@/store/useDesktopStore";
import { useFlyoutStore } from "@/store/useFlyoutStore";
import { useEffect, useState } from "react";
import Flyout from "./flyout";
import dynamic from "next/dynamic";
const StartMenu = dynamic(() => import("@/app/components/flyouts/startMenu"));

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
        <footer className='w-full h-16 bg-neutral-800 flex justify-between items-center px-4'>
            <div className="flex justify-center gap-8">
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("start", e.currentTarget)}
                >
                    Start
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
            </div>

            <Flyout
                id="start"
                isOpen={activeFlyout === "start"}
                width="400px"
                height="80vh"
                position={{ bottom: 64, left: 0 }}
            >
                <StartMenu />
            </Flyout>
        </footer >
    )
}

export default Taskbar