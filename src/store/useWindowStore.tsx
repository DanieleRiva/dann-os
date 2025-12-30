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
    openWindows: string[];
    minimizedWindows: string[];
    focusedWindow: string | null;
    triggerElement?: HTMLElement | null;

    windowPositions: Record<string, Position>;
    windowSizes: Record<string, Size>;

    hoveredSnapArea: 'left' | 'right' | 'top' | null;

    toggleWindow: (id: string, trigger?: HTMLElement | null) => void;
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

        toggleWindow: (id, trigger) => {
            const { openWindows, minimizedWindows, focusedWindow } = get();

            if (!openWindows?.includes(id)) {
                set({
                    openWindows: [...openWindows, id],
                    focusedWindow: id,
                    triggerElement: trigger
                });
            } else {
                if (focusedWindow === id) {
                    set({
                        focusedWindow: null,
                        minimizedWindows: [...minimizedWindows, id]
                    });
                } else {
                    set({
                        minimizedWindows: minimizedWindows.filter((windowId) => windowId !== id),
                        focusedWindow: id
                    });
                }
            }
        },
        focusWindow: (id) => {
            const { minimizedWindows } = get();
            set({
                focusedWindow: id,
                minimizedWindows: minimizedWindows.filter((windowId) => windowId !== id)
            });
        },
        minimizeWindow: (id) => {
            const { minimizedWindows, focusedWindow } = get();

            set({
                minimizedWindows: [...minimizedWindows, id],
                focusedWindow: focusedWindow === id ? null : focusedWindow
            });
        },
        closeWindow: (id) => {
            const { openWindows, minimizedWindows, focusedWindow } = get();

            set({
                openWindows: openWindows.filter((windowId) => windowId !== id),
                minimizedWindows: minimizedWindows.filter((windowId) => windowId !== id),
                focusedWindow: focusedWindow === id ? null : focusedWindow
            });
        },

        setWindowPosition: (id, position) => {
            set((state) => ({
                windowPositions: {
                    ...state.windowPositions,
                    [id]: position
                }
            }));
        },
        setWindowSize: (id, size) => {
            set((state) => ({
                windowSizes: { ...state.windowSizes, [id]: size }
            }));
        },

        setHoveredSnapArea: (area) => set({ hoveredSnapArea: area }),
    })
);