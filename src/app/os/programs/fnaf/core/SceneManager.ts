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

interface OfficeSceneElements {
    officeSpace: HTMLDivElement | null;
    office: HTMLImageElement | null;
    fan: HTMLImageElement | null;
    lPanel: HTMLImageElement | null;
    rPanel: HTMLImageElement | null;
    lDoor: HTMLImageElement | null;
    lLight: HTMLImageElement | null;
    freddy: HTMLImageElement | null;
    rDoor: HTMLImageElement | null;
    rLight: HTMLImageElement | null;
}

export class SceneManager {
    private engine: Engine;

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

    constructor(engine: Engine) {
        this.engine = engine;
    }

    public onSceneChange?: ((newScene: SceneId) => void) | null = null;

    public menuElements: Record<string, HTMLImageElement | null> = {
        'freddy-menu': null,
        'static-full': null
    };

    public officeElements: OfficeSceneElements = {
        officeSpace: null,
        office: null,
        fan: null,
        lPanel: null,
        rPanel: null,
        lDoor: null,
        lLight: null,
        freddy: null,
        rDoor: null,
        rLight: null,
    };

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

        switch (sceneId) {
            case "menu":
                this.engine.audio.playSound("static-long", 0.75, true);
                this.engine.audio.playSound("darkness", 1, true);
                break;
            case "night":
                this.engine.audio.stopAllSounds();
                this.engine.audio.playSound('blip', 1);
                break;
            case "game":
                this.engine.audio.playSound("fan", 0.3, true);
                break;
        }
    }

    public updatePanelImg(side: 'left' | 'right') {
        let door;
        let light;
        let panel;

        if (side === 'left') {
            panel = this.officeElements['lPanel'];
            if (!panel) return;

            door = this.engine.lDoor;
            light = this.engine.lLight;

            if (door) {
                if (light) {
                    panel.src = "/programs/fnaf/office/doorsAndLights/lLight/130.png";
                } else {
                    panel.src = "/programs/fnaf/office/doorsAndLights/lLight/124.png";
                }
            } else {
                if (light) {
                    panel.src = "/programs/fnaf/office/doorsAndLights/lLight/125.png";
                } else {
                    panel.src = "/programs/fnaf/office/doorsAndLights/lLight/122.png";
                }
            }
        } else {
            panel = this.officeElements['rPanel'];
            if (!panel) return;

            door = this.engine.rDoor;
            light = this.engine.rLight;

            if (door) {
                if (light) {
                    panel.src = "/programs/fnaf/office/doorsAndLights/rLight/47.png";
                } else {
                    panel.src = "/programs/fnaf/office/doorsAndLights/rLight/135.png";
                }
            } else {
                if (light) {
                    panel.src = "/programs/fnaf/office/doorsAndLights/rLight/131.png";
                } else {
                    panel.src = "/programs/fnaf/office/doorsAndLights/rLight/134.png";
                }
            }
        }
    }

    public destroy() {
        Object.keys(this.menuElements).forEach(key => {
            this.menuElements[key] = null;
        });

        Object.keys(this.officeElements).forEach(key => {
            this.officeElements[key as keyof OfficeSceneElements] = null;
        });
    }
}