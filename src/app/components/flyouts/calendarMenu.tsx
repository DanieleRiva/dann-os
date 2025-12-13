import React, { useState, useEffect } from 'react';
import Flyout from '../flyout';
import { useFlyoutStore } from '@/store/useFlyoutStore';
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const CalendarMenu = () => {
    const { activeFlyout } = useFlyoutStore();
    const [value, setValue] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);

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
            className="rounded-tl-xl rounded-tr-xl bg-blur"
        >
            <div className="flex flex-col w-full h-full">
                <div className='flex-1 p-3 text-white'>
                    Controlli rapidi
                </div>

                <div className='flex-1 flex flex-row items-center justify-center gap-8 bg-white p-3 h-full border-2 border-[#4b4b4b] rounded-sm text-black'>
                    <div className="flex-1 !w-1/2">
                        <Calendar
                            value={value}
                            locale="it-IT"
                            className={`
                                w-full h-full !border-none 
                                
                                /* Cambia il padding di TUTTI i riquadri (giorni) */
                                [&_.react-calendar__tile react-calendar__month-view__days__day]:!p-1
                                [&_.react-calendar__tile react-calendar__month-view__days__day]:!text-sm

                                /* Togli la sottolineatura dai giorni (abbr tag) */
                                [&_abbr]:no-underline
                                [&_abbr]:font-normal
                            `}
                        />
                    </div>

                    <div className="flex-1 !w-1/2 flex flex-col items-center justify-center items-center gap-4">
                        <Clock
                            value={value}
                            // size={150} 
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