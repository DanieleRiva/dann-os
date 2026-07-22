import { useWindowStore } from '@/store/useWindowStore';
import React from 'react'
import Window from '../../components/window';
import type { WindowInstance } from "@/app/utils/interfaces";

const ToolBar = [
    {
        name: "Salva",
    },
    {
        name: "Info",
    }
];

const Notepad = ({ instance }: { instance: WindowInstance }) => {
    const { toggleWindow, openWindows } = useWindowStore();

    return (
        <>
            <Window
                id={instance.instanceId}
                title={instance.title}
                icon={instance.icon}
                width="700px"
                height="500px"
                minWidth="300px"
                minHeight="300px"
                canResize={true}
                canMinimize={true}
            >
                <div className='flex flex-col w-full h-full'>
                    <div className='p-1 flex flex-row gap-1 items-center w-full bg-background'>
                        {ToolBar.map((item) => (
                            <div
                                key={item.name} 
                                className='transition-all hover:bg-gray-300 py-1 px-2 rounded-sm cursor-pointer'
                                onClick={(e) => toggleWindow(`notepad${item.name}`, e.currentTarget)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>

                    <textarea className='w-full h-full m-0 p-0 border-none outline-none resize-none'></textarea>
                </div>

                
            </Window>
        </>
    );
}

export default Notepad;