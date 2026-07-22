import Window from '@/app/components/window'
import { WindowInstance } from '@/app/utils/interfaces'
import React, { useState } from 'react'
import { createGame, Data, Result, Move, BUTTONS_IMAGES, MOVES, playRound, BUTTONS_ORIGIN, BUTTON_POS } from './engine';

const RPS = ({ instance }: { instance: WindowInstance }) => {
    const [gameData, setGameData] = useState<Data>(createGame);
    const [hovered, setHovered] = useState<Move | null>(null);

    function startGame() {
        setGameData(prev => ({ ...prev, state: 'playing' }));
    }

    function setResult(outcome: [Result, Move]) {
        setGameData(prev => ({ ...prev, result: outcome[0], cpuMove: outcome[1] }));
    }

    return (
        <Window
            id={instance.instanceId}
            title={instance.title}
            icon={instance.icon}
            minWidth="512px"
            minHeight="512px"
            canResize={false}
            canMinimize={true}
        >
            <div className='select-auto! p-6 w-full h-full bg-[#fbb597] flex flex-col justify-center items-center text-white'>
                {gameData.state === 'menu' && (
                    <button
                        className='bg-[#97ddfb] font-bold px-4 py-2 text-black rounded-lg cursor-pointer transition-all hover:bg-[#fbb597] border-4 border-transparent hover:border-[#97ddfb]'
                        onClick={startGame}
                    >
                        GIOCA
                    </button>
                )}

                {gameData.state === 'playing' && (
                    <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
                        <p className='text-2xl'>
                            {gameData.result === 'draw' && `${gameData.cpuMove?.toUpperCase()}! It's a draw!`}
                            {gameData.result === 'win' && `${gameData.cpuMove?.toUpperCase()}! You win!`}
                            {gameData.result === 'lose' && `${gameData.cpuMove?.toUpperCase()}! You lose!`}
                            {!gameData.result && 'Choose a move!'}
                        </p>

                        <div className="relative w-80 h-80">
                            <img
                                src="/programs/rps/logo.png"
                                alt="Carta Forbici Sasso"
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                            />


                            {MOVES.map(move => (
                                <img
                                    key={move}
                                    src={BUTTONS_IMAGES[move]}
                                    alt={move}
                                    style={{ transformOrigin: BUTTONS_ORIGIN[move] }}
                                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-200 ${hovered === move ? 'scale-110' : ''}`}
                                />
                            ))}

                            {MOVES.map(move => (
                                <button
                                    key={move}
                                    aria-label={move}
                                    onMouseEnter={() => setHovered(move)}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={() => {
                                        setResult(playRound(move));
                                    }}
                                    style={{ top: BUTTON_POS[move].top, left: BUTTON_POS[move].left }}
                                    className="absolute w-2/5 h-2/5 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Window>
    )
}

export default RPS