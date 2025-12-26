"use client"

import React from 'react'
import dynamic from 'next/dynamic';
import { useWindowStore } from '@/store/useWindowStore';
const Notepad = dynamic(() => import("@/app/os/programs/notepad"));
const Explorer = dynamic(() => import("@/app/os/programs/explorer"));
const Journal = dynamic(() => import("@/app/os/programs/journal"));

const WindowManager = () => {
    const { openWindows } = useWindowStore();

    return (
        <>
            {openWindows.includes("explorer") && (
                <Explorer />
            )}

            {openWindows.includes("notepad") && (
                <Notepad />
            )}

            {openWindows.includes("journal") && (
                <Journal />
            )}
        </>
    )
}

export default WindowManager