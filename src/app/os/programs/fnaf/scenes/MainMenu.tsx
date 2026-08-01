import { Engine } from '../core/Engine'

interface MainMenuProps {
    engine: Engine
}

const MainMenu = ({ engine }: MainMenuProps) => {
    return (
        <div className='text-white'>
            <button>
                New Game
            </button>
        </div>
    )
}

export default MainMenu