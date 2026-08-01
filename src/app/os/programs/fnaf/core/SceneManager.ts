import DeathScene from "../scenes/DeathScene"
import ExtrasScene from "../scenes/ExtrasScene"
import GameScene from "../scenes/GameScene"
import MainMenu from "../scenes/MainMenu"
import NewspaperScene from "../scenes/NewspaperScene"
import NightScene from "../scenes/NightScene"
import StartupScene from "../scenes/StartupScene"
import { Engine } from "./Engine"

type SceneId =
    'main-menu'
    | 'newspaper'
    | 'night'
    | 'startup'
    | 'game'
    | 'death'
    | 'extras';

export class SceneManager {
    private readonly SCENES:
        Record<SceneId, React.FC<{ engine: Engine }>> = {
            'main-menu': MainMenu,
            'newspaper': NewspaperScene,
            'night': NightScene,
            'startup': StartupScene,
            'game': GameScene,
            'death': DeathScene,
            'extras': ExtrasScene,
        };

    private currentScene: SceneId = 'main-menu';

    public onSceneChange?: ((newScene: SceneId) => void) | null = null;

    constructor() {
    }

    public getScene() {
        return this.SCENES[this.currentScene];
    }

    public changeScene(sceneId: SceneId) {
        this.currentScene = sceneId;

        if (this.onSceneChange) {
            this.onSceneChange(this.currentScene);
        }

        // controlalre a quale scena si cambia
        // per fare robe
    }

}