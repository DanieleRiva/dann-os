import { create } from 'zustand';

type DesktopState = {
    showGridDisplayer: boolean;
    showCellHighlighter: boolean;
    toggleGrid: () => void;
    toggleHighlighter: () => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
    showGridDisplayer: false,
    showCellHighlighter: true,
    toggleGrid: () => {
        set((state) => ({ showGridDisplayer: !state.showGridDisplayer }));
    },
    toggleHighlighter: () => {
        set((state) => ({ showCellHighlighter: !state.showCellHighlighter }));
    }
}));