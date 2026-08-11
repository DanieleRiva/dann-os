"use client"

import OfficeSpace from "../components/OfficeSpace"
import OfficeUI from "../components/OfficeUI"
import { Engine } from "../core/Engine"

interface GameSceneProps {
    engine: Engine
}

const GameScene = ({ engine }: GameSceneProps) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!engine) {
            return;
        }

        const windowSize = e.currentTarget.getBoundingClientRect();
        const mouseX = (e.clientX - windowSize.left) / windowSize.width;
        const mouseY = (e.clientY - windowSize.top) / windowSize.height;
        engine.updateMousePosition(mouseX, mouseY);
    }

    return (
        <div onMouseMove={handleMouseMove} className="w-full h-full">
            <OfficeSpace engine={engine} />

            <OfficeUI  engine={engine} />
        </div>
    )
}

export default GameScene