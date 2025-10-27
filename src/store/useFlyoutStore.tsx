import { create } from 'zustand';

type FlyoutStore = {
    activeFlyout: string | null;
    toggleFlyout: (id: string) => void;
}

export const useFlyoutStore = create<FlyoutStore>()(
    (set, get) => ({
        activeFlyout: null,
        toggleFlyout: (id) => {
            set({ activeFlyout: get().activeFlyout === id ? null : id })
        }
    })
);