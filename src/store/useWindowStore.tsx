import { REGISTRY } from '@/app/os/registry';
import { WindowInstance } from '@/app/utils/interfaces';
import { create } from 'zustand';

interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

type WindowStore = {
    openWindows: WindowInstance[];
    minimizedWindows: string[];
    focusedWindow: string | null;
    triggerElement?: HTMLElement | null;

    windowPositions: Record<string, Position>;
    windowSizes: Record<string, Size>;

    hoveredSnapArea: 'left' | 'right' | 'top' | null;

    toggleWindow: (appId: string, trigger?: HTMLElement | null) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    closeWindow: (id: string) => void;

    setWindowPosition: (id: string, position: Position) => void;
    setWindowSize: (id: string, size: Size) => void;

    setHoveredSnapArea: (area: 'left' | 'right' | 'top' | null) => void;
}

export const useWindowStore = create<WindowStore>()(
    (set, get) => ({
        openWindows: [],
        minimizedWindows: [],
        focusedWindow: null,
        triggerElement: null,

        windowPositions: {},
        windowSizes: {},

        hoveredSnapArea: null,

        toggleWindow: (appId, trigger) => {
            const { openWindows, minimizedWindows, focusedWindow } = get();
            const existing = openWindows.find((w) => w.appId === appId);

            if (!existing) {
                const manifest = REGISTRY[appId];
                const instanceId = manifest?.singleton ? appId : `${appId}-${crypto.randomUUID()}`;

                const instance = {
                    instanceId: instanceId,
                    appId: appId,
                    title: manifest?.name ?? appId,
                    icon: manifest?.icon ?? "",
                    payload: {},
                };

                set({
                    openWindows: [...openWindows, instance],
                    focusedWindow: instance.instanceId,
                    triggerElement: trigger,
                });
                return;
            }

            if (focusedWindow === existing.instanceId) {
                set({
                    focusedWindow: null,
                    minimizedWindows: [...minimizedWindows, existing.instanceId],
                });
                return;
            }

            set({
                minimizedWindows: minimizedWindows.filter((wid) => wid !== existing.instanceId),
                focusedWindow: existing.instanceId,
                triggerElement: trigger,
            });
        },
        focusWindow: (instanceId) => {
            const { minimizedWindows } = get();
            set({
                focusedWindow: instanceId,
                minimizedWindows: minimizedWindows.filter((windowId) => windowId !== instanceId)
            });
        },
        minimizeWindow: (instanceId) => {
            const { minimizedWindows, focusedWindow } = get();

            set({
                minimizedWindows: [...minimizedWindows, instanceId],
                focusedWindow: focusedWindow === instanceId ? null : focusedWindow
            });
        },
        closeWindow: (instanceId) => {
            const { openWindows, minimizedWindows, focusedWindow } = get();

            set({
                openWindows: openWindows.filter((w) => w.instanceId !== instanceId),
                minimizedWindows: minimizedWindows.filter((windowId) => windowId !== instanceId),
                focusedWindow: focusedWindow === instanceId ? null : focusedWindow
            });
        },

        setWindowPosition: (instanceId, position) => {
            set((state) => ({
                windowPositions: {
                    ...state.windowPositions,
                    [instanceId]: position
                }
            }));
        },
        setWindowSize: (instanceId, size) => {
            set((state) => ({
                windowSizes: { ...state.windowSizes, [instanceId]: size }
            }));
        },

        setHoveredSnapArea: (area) => set({ hoveredSnapArea: area }),
    })
);