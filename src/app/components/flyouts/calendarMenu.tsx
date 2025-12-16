import React, { useState, useEffect } from 'react';
import Flyout from '../flyout';
import { useFlyoutStore } from '@/store/useFlyoutStore';
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useDesktopStore } from '@/store/useDesktopStore';
import { icons } from '@/constants/constants';
import clsx from 'clsx';

const CalendarMenu = () => {
    const { activeFlyout } = useFlyoutStore();
    const [value, setValue] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const { showGridDisplayer, toggleGrid, showCellHighlighter, toggleHighlighter } = useDesktopStore();

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }

    useEffect(() => {
        setIsMounted(true);

        const interval = setInterval(() => setValue(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Flyout
            id="calendar"
            isOpen={activeFlyout === "calendar"}
            width="600px"
            height="450px"
            position={{ right: 0 }}
            className="rounded-xl p-3"
        >
            <div className="flex flex-col w-full h-full">
                <div className='flex-1 flex flex-row justify-evenly items-center text-white'>
                    <button className={clsx("cursor-pointer w-24 !h-14 rounded-lg show-desktop-btn flex justify-center items-center", fullscreen && "!bg-background")} onClick={toggleFullscreen}>
                        <img src={fullscreen ? icons.toggleFullscreenBlack : icons.toggleFullscreenWhite} width={22} alt="" />
                    </button>
                    <button className={clsx("cursor-pointer w-24 !h-14 rounded-lg show-desktop-btn flex justify-center items-center", showGridDisplayer && "!bg-background")} onClick={toggleGrid}>
                        <img src={showGridDisplayer ? icons.toggleGridBlack : icons.toggleGridWhite} width={22} alt="" />
                    </button>
                    <button className={clsx("cursor-pointer w-24 !h-14 rounded-lg show-desktop-btn flex justify-center items-center", showCellHighlighter && "!bg-background")} onClick={toggleHighlighter}>
                        <img src={showCellHighlighter ? icons.toggleDropHighlighterBlack : icons.toggleDropHighlighterWhite} width={22} alt="" />
                    </button>
                </div>

                <div className='flex-1 flex flex-row items-center justify-evenly bg-background p-3 h-full border-2 border-[#4b4b4b] rounded-lg text-black'>
                    <div className="w-72">
                        <Calendar
                            value={value}
                            locale="it-IT"
                            className={`
                                w-full h-full !border-none !bg-background
                                
                                /* Cambia il padding di TUTTI i riquadri (giorni) */
                                [&_.react-calendar__tile react-calendar__month-view__days__day]:!p-1
                                [&_.react-calendar__tile react-calendar__month-view__days__day]:!text-sm

                                /* Togli la sottolineatura dai giorni (abbr tag) */
                                [&_abbr]:no-underline
                                [&_abbr]:font-normal
                            `}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <Clock
                            value={value}
                            renderNumbers={true}
                            className="w-full h-full"
                        />
                        {value.toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </Flyout>
    );
}

export default CalendarMenu;