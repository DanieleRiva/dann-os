"use client"

import React from 'react'
import dynamic from 'next/dynamic';
import { useWindowStore } from '@/store/useWindowStore';
const Notepad = dynamic(() => import("@/app/os/programs/notepad"));
const Explorer = dynamic(() => import("@/app/os/programs/explorer"));

const WindowManager = () => {
    const { openWindows } = useWindowStore();

    return (
        <>
            {openWindows.includes("notepad") && (
                <Notepad />
            )}

            {openWindows.includes("explorer") && (
                <Explorer />
            )}
        </>
    )
}

export default WindowManager