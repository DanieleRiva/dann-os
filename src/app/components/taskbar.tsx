"use client"

import { useDesktopStore } from "@/store/useDesktopStore";
import { useFlyoutStore } from "@/store/useFlyoutStore";
import { useWindowStore } from "@/store/useWindowStore";
import { useEffect, useState } from "react";
import TaskbarButton from "./taskbarButton";
import { UseCurrentTime } from "../utils/useCurrentTime";
import { clsx } from 'clsx';

const Taskbar = () => {
    const { toggleFlyout } = useFlyoutStore();
    const { toggleWindow, openWindows, minimizedWindows, focusedWindow } = useWindowStore();

    const { formattedTime, formattedDate } = UseCurrentTime();

    const date = Date();

    return (
        <footer className='w-full !z-30 h-16 flex justify-between items-center px-0 bg-blur bg-blur-texture absolute bottom-0'>

            <div className="flex justify-center gap-1">
                <TaskbarButton
                    icon="/icons/shell/logo.png"
                    iconHover="/icons/shell/logoBloom.png"
                    imgWidth={72} imgHeight={72}
                    onClick={(e) => toggleFlyout("start", e.currentTarget)}
                    alt="Logo"
                    special
                />

                <TaskbarButton
                    icon="/icons/programs/explorer.ico"
                    imgWidth={42} imgHeight={42}
                    onClick={(e) => toggleWindow("explorer", e.currentTarget)}
                    alt="Logo"
                    btnClassName={clsx(
                        "transition-colors duration-200",
                        
                        openWindows.includes("explorer") && !minimizedWindows.includes("explorer") && "bg-red-500/50 border-b-2 border-red-500",
                        
                        minimizedWindows.includes("explorer") && "bg-green-500/50"
                    )}
                />

                <TaskbarButton
                    icon="/icons/programs/journal.ico"
                    imgWidth={40} imgHeight={40}
                    onClick={(e) => toggleWindow("notepad", e.currentTarget)}
                    alt="Logo"
                    btnClassName={clsx(
                        "transition-colors duration-200",

                        openWindows.includes("notepad") && !minimizedWindows.includes("notepad") && "bg-red-500/50 border-b-2 border-red-500",
                        
                        minimizedWindows.includes("notepad") && "bg-green-500/50"
                    )}
                />
            </div>

            <div className="flex justify-center h-full items-center gap-2">
                <button
                    className="cursor-pointer"
                    onClick={(e) => toggleFlyout("notification", e.currentTarget)}
                >
                    🕭
                </button>

                <button className="cursor-pointer flex justify-center items-center">
                    <img src="/icons/shell/network/1.ico" className="w-5 h-5 mb-0.5" />
                </button>
                <button
                    className="cursor-pointer flex justify-center items-center"
                    onClick={(e) => toggleFlyout("volume", e.currentTarget)}
                >
                    <img src="/icons/shell/audio/3.ico" className="w-4 h-4" />
                </button>
                <button
                    className="cursor-pointer text-sm taskbar-icon px-3 h-full transition-all"
                    onClick={(e) => toggleFlyout("calendar", e.currentTarget)}
                >
                    {formattedTime} <br />
                    {formattedDate}
                </button>
                <button className="cursor-pointer w-4 show-desktop-btn"></button>
            </div>

        </footer >
    )
}

export default Taskbar