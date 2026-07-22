import { useWindowStore } from '@/store/useWindowStore';
import React from 'react'
import Window from '../../components/window';

const ImageViewer = () => {
    const { toggleWindow, openWindows } = useWindowStore();

    return (
        <Window
            id="imageViewer"
            title="Immagine"
            icon="/icons/files/picture.ico"
            isOpen={openWindows.includes("imageViewer")}
            width="700px"
            height="500px"
            minWidth="300px"
            minHeight="300px"
            canResize={true}
            canMinimize={true}
        >
            <textarea className='w-full h-full m-0 p-0 border-none outline-none resize-none'></textarea>
        </Window>
    );
}

export default ImageViewer;