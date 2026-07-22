import Window from "../../components/window";
import type { WindowInstance } from "@/app/utils/interfaces";

const Explorer = ({ instance }: { instance: WindowInstance }) => {
    return (
        <Window
            id={instance.instanceId}
            title={instance.title}
            icon={instance.icon}
            width="700px"
            height="500px"
            minWidth="200px"
            minHeight="200px"
        >
            Explorer - {String(instance.payload?.path ?? "root")}
        </Window>
    );
};

export default Explorer;