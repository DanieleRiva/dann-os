import { useWindowStore } from '@/store/useWindowStore';
import React from 'react'
import Window from '../../components/window';

const Journal = () => {
    const { openWindows } = useWindowStore();

    return (
        <Window
            id="journal"
            title="Journal"
            icon="/icons/programs/journal.ico"
            isOpen={openWindows.includes("journal")}
            width="700px"
            height="500px"
            minWidth="300px"
            minHeight="300px"
            canResize={true}
            canMinimize={true}
        >
            <div className='flex flex-col items-center gap-2 h-full'>
                <h1 className='text-5xl'>This is the Journal</h1>
                <h2>Take notes everywhere</h2>
                <textarea className='w-full h-full m-0 mt-8 p-0 outline-none resize-none border-2 border-black'></textarea>
            </div>
        </Window>
    );
}

export default Journal;