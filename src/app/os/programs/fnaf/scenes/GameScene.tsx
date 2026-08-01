"use client"

import OfficeSpace from "../components/OfficeSpace"
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
        const mouseX = Number(
            (
                (e.clientX - windowSize.left) / windowSize.width
            ).toFixed(2)
        );
        const mouseY = Number(
            (
                (e.clientY - windowSize.top) / windowSize.height
            ).toFixed(2)
        );
        engine.updateMousePosition(mouseX, mouseY);
    }

    return (
        <div onMouseMove={handleMouseMove} className="w-full h-full">
            <OfficeSpace engine={engine} />
        </div>
    )
}

export default GameScene