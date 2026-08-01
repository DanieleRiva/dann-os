import { Engine } from "../core/Engine"

interface StartupSceneProps {
    engine: Engine
}

const StartupScene = ({ engine }: StartupSceneProps) => {
    return (
        <div>StartupScene</div>
    )
}

export default StartupScene