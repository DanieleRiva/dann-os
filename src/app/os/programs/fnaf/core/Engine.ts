import { Animator } from "./Animator";
import { AudioEngine } from "./AudioEngine";
import { SceneManager } from "./SceneManager";

export class Engine {
    public mouseX: number = 0;
    public mouseY: number = 0;

    public nodes: Record<string, HTMLElement | null> = {};

    public sceneManager: SceneManager;
    public audio: AudioEngine;
    public animator: Animator;

    // da salvare in localStorage
    public night: number = 1;

    public lDoor: boolean = false;
    public lLight: boolean = false;
    public rDoor: boolean = false;
    public rLight: boolean = false;

    public constructor() {
        this.sceneManager = new SceneManager(this);
        this.audio = new AudioEngine();
        this.animator = new Animator(this);
    }

    public init() {
    }

    public registerNode(name: string, element: HTMLElement | null) {
        this.nodes[name] = element;

        this.log(`Registered node "${name}"`);
    }

    public openMenu() {
        this.sceneManager.changeScene('menu');
    }

    public startNewGame() {
        this.night = 1;
        this.audio.stopAllSounds();
        this.sceneManager.changeScene('newspaper');
    }

    public quickGame() {
        this.night = 1;
        this.audio.stopAllSounds();
        this.sceneManager.changeScene('game');
    }

    public continueGame() {

    }

    public updateMousePosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }

    public toggleDoor(side: 'left' | 'right') {
        if (side === 'left') {
            this.lDoor = !this.lDoor;
            this.sceneManager.updatePanelImg(side);
            this.animator.triggerDoorAnimation('left');
        } else {
            this.rDoor = !this.rDoor;
            this.sceneManager.updatePanelImg(side);
            this.animator.triggerDoorAnimation('right');
        }
    }

    public toggleLight(side: 'left' | 'right') {
        if (side === 'left') {
            this.lLight = !this.lLight;
            if (this.lLight && this.rLight) {
                this.rLight = false;
                this.sceneManager.updatePanelImg('right');
            }

            this.sceneManager.updatePanelImg(side);
            // this.animator.triggerLight('left');
        } else {
            this.rLight = !this.rLight;
            if (this.rLight && this.lLight) {
                this.lLight = false;
                this.sceneManager.updatePanelImg('left');
            }

            this.sceneManager.updatePanelImg(side);
            // this.animator.triggerLight('right');
        }

        console.log(`lLight: ${this.lLight} | rLight: ${this.rLight}`);
        this.lightSound();
    }

    private lightSound() {
        this.audio.stopSound('light');
        
        if (this.lLight) {
            this.audio.playSound(
                'light',
                1,
                true,
                -1
            );
        } else if (this.rLight) {
            this.audio.playSound(
                'light',
                1,
                true,
                1
            );
        }
    }

    private log(message: string, ...args: any[]) {
        console.log(
            `%c ENGINE %c ${message}`,
            'background-color: #1559a2; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
            'background-color: transparent; color: inherit;',
            ...args
        );
    }

    public destroy() {
        this.audio.stopAllSounds();
        this.nodes = {};
    }
}