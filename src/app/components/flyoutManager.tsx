"use client"

import React from 'react'
import dynamic from 'next/dynamic';
const StartMenu = dynamic(() => import("@/app/os/flyouts/startMenu"));
const CalendarMenu = dynamic(() => import("@/app/os/flyouts/calendarMenu"));
const VolumeFlyout = dynamic(() => import("@/app/os/flyouts/volumeFlyout"));
const Notification = dynamic(() => import("@/app/os/flyouts/notification"));

const FlyoutManager = () => {
    return (
        <>
            <StartMenu />
            <CalendarMenu />
            <VolumeFlyout />
            <Notification />
        </>
    )
}

export default FlyoutManager