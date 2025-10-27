import { create } from 'zustand';

type FlyoutStore = {
    activeFlyout?: string | null;
    triggerElement?: HTMLElement | null;
    toggleFlyout: (id: string, trigger?: HTMLElement | null) => void;
}

export const useFlyoutStore = create<FlyoutStore>()(
    (set, get) => ({
        activeFlyout: null,
        triggerElement: null,
        toggleFlyout: (id, trigger) => {
            set({
                activeFlyout: get().activeFlyout === id ? null : id,
                triggerElement: get().activeFlyout === id ? null : trigger
            })
        }
    })
);