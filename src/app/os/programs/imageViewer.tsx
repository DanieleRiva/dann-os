import Window from '../../components/window';
import { WindowInstance } from '@/app/utils/interfaces';

const ImageViewer = ({ instance }: { instance: WindowInstance }) => {
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
            <textarea className='w-full h-full m-0 p-0 border-none outline-none resize-none'></textarea>
        </Window>
    );
}

export default ImageViewer;