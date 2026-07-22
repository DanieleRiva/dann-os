import Window from '../../components/window';
import { WindowInstance } from '@/app/utils/interfaces';

const Journal = ({ instance }: { instance: WindowInstance }) => {

    return (
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
            <div className='flex flex-col items-center gap-2 h-full'>
                <h1 className='text-5xl'>This is the Journal</h1>
                <h2>Take notes everywhere</h2>
                <textarea className='w-full h-full m-0 mt-8 p-0 outline-none resize-none border-2 border-black'></textarea>
            </div>
        </Window>
    );
}

export default Journal;