import dynamic from "next/dynamic";
import type { AppManifest } from "@/app/utils/interfaces";

import NotepadInfo from "@/app/os/programs/notepadInfo";
import ImageViewer from "@/app/os/programs/imageViewer";
import RPS from "./programs/rps/rps";
import FNAF from "./programs/fnaf/FNAF";

export const REGISTRY: Record<string, AppManifest> = {
    explorer: {
        appId: "explorer",
        name: "Explorer",
        icon: "/icons/programs/explorer.ico",
        component: dynamic(() => import("@/app/os/programs/explorer")),
        singleton: true,
        defaultSize: { width: 700, height: 500 },
        minSize: { width: 200, height: 200 },
        pinned: true
    },

    notepad: {
        appId: "notepad",
        name: "Notepad",
        icon: "/icons/programs/notepad.ico",
        component: dynamic(() => import("@/app/os/programs/notepad")),
        singleton: true,
        defaultSize: { width: 600, height: 400 },
        pinned: true
    },
    notepadInfo: {
        appId: "notepadInfo",
        name: "NotepadInfo",
        icon: "/icons/programs/notepad.ico",
        component: NotepadInfo,
        singleton: true,
        defaultSize: { width: 400, height: 300 }
    },

    journal: {
        appId: "journal",
        name: "Journal",
        icon: "/icons/programs/journal.ico",
        component: dynamic(() => import("@/app/os/programs/journal")),
        singleton: true,
        defaultSize: { width: 600, height: 400 },
        pinned: true
    },

    imageViewer: {
        appId: "imageViewer",
        name: "Image Viewer",
        icon: "/icons/files/picture.ico",
        component: ImageViewer,
        singleton: true,
        defaultSize: { width: 600, height: 400 }
    },

    rps: {
        appId: "rps",
        name: "Rock, Paper, Scissors, SHOOT",
        icon: "/icons/programs/rps.png",
        component: RPS,
        singleton: true,
        defaultSize: { width: 600, height: 400 }
    },

    fnaf: {
        appId: "fnaf",
        name: "Five Nights at Freddy's Remake",
        icon: "/icons/programs/fnaf.png",
        component: FNAF,
        singleton: true,
        defaultSize: { width: 600, height: 400 }
    }
};