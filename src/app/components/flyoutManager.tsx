"use client"

import React from 'react'
import Flyout from "./flyout";
import { useFlyoutStore } from "@/store/useFlyoutStore";
import dynamic from 'next/dynamic';
const StartMenu = dynamic(() => import("@/app/components/flyouts/startMenu"));
const CalendarMenu = dynamic(() => import("@/app/components/flyouts/calendarMenu"));

const FlyoutManager = () => {
    const { activeFlyout, toggleFlyout } = useFlyoutStore();

    return (
        <div>
            <Flyout
                id="start"
                isOpen={activeFlyout === "start"}
                width="400px"
                height="550px"
                position={{ left: 0 }}
                className="rounded-tl-xl rounded-tr-xl bg-blur-effect"
            >
                <StartMenu />
            </Flyout>

            <Flyout
                id="calendar"
                isOpen={activeFlyout === "calendar"}
                width="400px"
                height="550px"
                position={{ right: 0 }}
                className="rounded-tl-xl rounded-tr-xl bg-blur-effect"
            >
                <CalendarMenu />
            </Flyout>
        </div>
    )
}

export default FlyoutManager