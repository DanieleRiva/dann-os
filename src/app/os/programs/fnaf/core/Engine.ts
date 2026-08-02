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

    public constructor() {
        this.sceneManager = new SceneManager();
        this.audio = new AudioEngine();
        this.animator = new Animator(this);
    }

    public init() {
    }

    public registerNode(name: string, element: HTMLElement | null) {
        this.nodes[name] = element;

        this.log(`Registered node "${name}"`);
    }

    public startNewGame() {
        this.night = 1;
        this.audio.stopAllSounds();
        this.sceneManager.changeScene('newspaper');
    }

    public continueGame() {

    }

    public updateMousePosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
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
        this.nodes = {};
    }
}