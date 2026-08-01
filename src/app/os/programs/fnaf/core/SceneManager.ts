import DeathScene from "../scenes/DeathScene"
import ExtrasScene from "../scenes/ExtrasScene"
import GameScene from "../scenes/GameScene"
import MainMenu from "../scenes/MainMenu"
import { Engine } from "./Engine"

type SceneId = 'main-menu' | 'extras' | 'game' | 'death';

export class SceneManager {
    private readonly SCENES:
        Record<SceneId, React.FC<{ engine: Engine }>> = {
            'main-menu': MainMenu,
            'extras': ExtrasScene,
            'game': GameScene,
            'death': DeathScene
        };

    private currentScene: SceneId = 'main-menu';

    constructor() {
    }

    public getScene() {
        return this.SCENES[this.currentScene];
    }

    public changeScene(sceneId: SceneId) {
        this.currentScene = sceneId;

        // controlalre a quale scena si cambia
        // per fare robe
    }

}