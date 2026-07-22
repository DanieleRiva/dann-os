import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'

const NotepadInfo = ({ instance }: { instance: WindowInstance }) => {
    return (
        <Window
            id={instance.instanceId}
            title={instance.title}
            icon={instance.icon}
            width="400px"
            height="100px"
            minWidth="400px"
            minHeight="100px"
            canResize={true}
            canMinimize={true}
        >
            <p
                className='flex justify-center items-center h-full w-full'
            >
                Notepad™ by Daniele Riva ©</p>
        </Window>
    )
}

export default NotepadInfo