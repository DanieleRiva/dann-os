"use client";

import { useWindowStore } from "@/store/useWindowStore";
import { REGISTRY } from "@/app/os/registry";

const WindowManager = () => {
    const { openWindows } = useWindowStore();

    return (
        <>
            {openWindows.map((instance) => {
                const manifest = REGISTRY[instance.appId];
                if (!manifest) return null;
                
                const App = manifest.component;
                return <App key={instance.instanceId} instance={instance} />;
            })}
        </>
    );
};

export default WindowManager;