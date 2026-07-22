import type { ComponentType } from "react";

export interface AppManifest {
    appId: string;
    name: string;
    icon: string;
    component: ComponentType<any>;
    singleton: boolean;
    defaultSize: {
        width: number; height: number
    };
    minSize?: {
        width: number; height: number
    };
    pinned?: boolean
}

export interface WindowInstance {
    instanceId: string;
    appId: string;
    title: string;
    icon: string;
    payload?: Record<string, unknown>;
}