import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type DesktopState = {
    showGridDisplayer: boolean;
    showCellHighlighter: boolean;
    toggleGrid: () => void;
    toggleHighlighter: () => void;
}

export const useDesktopStore = create<DesktopState>()(
    persist(
        (set, get) => ({
            showGridDisplayer: false,
            showCellHighlighter: true,
            toggleGrid: () => {
                set({ showGridDisplayer: !get().showGridDisplayer });
            },
            toggleHighlighter: () => {
                set({ showCellHighlighter: !get().showCellHighlighter });
            }
        }),
        {
            name: 'desktop-settings'
        }
    )
);

