import DeathScene from "../scenes/DeathScene"
import ExtrasScene from "../scenes/ExtrasScene"
import GameScene from "../scenes/GameScene"
import Menu from "../scenes/Menu"
import NewspaperScene from "../scenes/NewspaperScene"
import NightScene from "../scenes/NightScene"
import StartupScene from "../scenes/StartupScene"
import { Engine } from "./Engine"

type SceneId =
    'menu'
    | 'newspaper'
    | 'night'
    | 'startup'
    | 'game'
    | 'death'
    | 'extras';

export class SceneManager {
    private readonly SCENES:
        Record<SceneId, React.FC<{ engine: Engine }>> = {
            'menu': Menu,
            'newspaper': NewspaperScene,
            'night': NightScene,
            'startup': StartupScene,
            'game': GameScene,
            'death': DeathScene,
            'extras': ExtrasScene,
        };

    private currentScene: SceneId = 'startup';

    public onSceneChange?: ((newScene: SceneId) => void) | null = null;

    public menuElements: Record<string, HTMLImageElement | null> = {
        'freddy-menu': null,
        'static-full': null
    };

    public officeElements: Record<string, HTMLImageElement | null> = {
        'fan': null,
        'l-door': null,
        'l-light': null,
        'bonnie': null,
        'freddy': null,
        'r-door': null,
        'r-light': null,
        'chica': null,
        'foxy': null,
    };

    constructor() {
    }

    public getScene() {
        return this.SCENES[this.currentScene];
    }

    public getSceneName() {
        return this.currentScene;
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