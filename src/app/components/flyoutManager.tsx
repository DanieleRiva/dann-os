"use client"

import React from 'react'
import dynamic from 'next/dynamic';
const StartMenu = dynamic(() => import("@/app/components/flyouts/startMenu"));
const CalendarMenu = dynamic(() => import("@/app/components/flyouts/calendarMenu"));
const VolumeFlyout = dynamic(() => import("@/app/components/flyouts/volumeFlyout"));
const Notification = dynamic(() => import("@/app/components/flyouts/notification"));

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