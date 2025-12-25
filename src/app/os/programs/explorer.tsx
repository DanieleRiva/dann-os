import { useWindowStore } from '@/store/useWindowStore';
import React from 'react'
import Window from '../../components/window';

const Explorer = () => {
    const { openWindows } = useWindowStore();

    return (
        <Window
            id="explorer"
            title="Explorer"
            icon="/icons/programs/explorer.ico"
            isOpen={openWindows.includes("explorer")}
            width="700px"
            height="500px"
            minWidth="200px"
            minHeight="200px"
        >
            Explorer
        </Window>
    );
}

export default Explorer;