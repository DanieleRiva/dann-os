"use client"

import { useFlyoutStore } from "@/store/useFlyoutStore";
import { useWindowStore } from "@/store/useWindowStore";
import TaskbarButton from "./taskbarButton";
import { UseCurrentTime } from "../utils/useCurrentTime";
import { clsx } from 'clsx';
import { REGISTRY } from "../os/registry";

const Taskbar = () => {
    const { toggleFlyout } = useFlyoutStore();
    const { toggleWindow, openWindows, minimizeWindow, focusedWindow } = useWindowStore();

    const { formattedTime, formattedDate } = UseCurrentTime();

    const focusedAppId = openWindows.find((w) => w.instanceId === focusedWindow)?.appId ?? null;
    const pinned = Object.values(REGISTRY).filter((m) => m.pinned);

    return (
        <footer className='w-full !z-30 h-16 flex justify-between items-center px-0 bg-blur bg-blur-texture absolute bottom-0'>

            <div className="flex justify-center items-center h-full gap-1">
                <TaskbarButton
                    icon="/icons/shell/logo.png"
                    iconHover="/icons/shell/logoBloom.png"
                    imgWidth={86} imgHeight={86}
                    onClick={(e) => toggleFlyout("start", e.currentTarget)}
                    alt="Logo"
                    special
                />

                {pinned.map((manifest) => {
                    const isRunning = openWindows.some((w) => w.appId === manifest.appId);
                    const isFocused = focusedAppId === manifest.appId;
                    return (
                        <TaskbarButton
                            key={manifest.appId}
                            icon={manifest.icon}
                            imgWidth={40} imgHeight={40}
                            onClick={(e) => toggleWindow(manifest.appId, e.currentTarget)}
                            alt={manifest.name}
                            btnClassName={clsx(
                                "transition-colors duration-200",
                                isRunning && isFocused && "taskbar-button-focused",
                                isRunning && !isFocused && "taskbar-button-open",
                            )}
                        />
                    );
                })}

                {openWindows
                    .filter((w) => !REGISTRY[w.appId]?.pinned)
                    .map((w) => (
                        <TaskbarButton
                            key={w.instanceId}
                            icon={w.icon}
                            imgWidth={40} imgHeight={40}
                            onClick={(e) => toggleWindow(w.appId, e.currentTarget)}
                            alt={w.title}
                            btnClassName={clsx(
                                "transition-colors duration-200",
                                focusedWindow === w.instanceId
                                    ? "taskbar-button-focused"
                                    : "taskbar-button-open",
                            )}
                        />
                    ))}
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
                <button
                    className="cursor-pointer w-4 show-desktop-btn"
                    onClick={() =>
                        openWindows.forEach(window => {
                            minimizeWindow(window.instanceId);
                        })
                    }
                >
                </button>
            </div>

        </footer >
    )
}

export default Taskbar