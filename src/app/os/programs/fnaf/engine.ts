import { Animator } from "./animator";
import { AudioEngine } from "./audioEngine";

export class Engine {
    public mouseX: number = 0;
    public mouseY: number = 0;

    public nodes: Record<string, HTMLElement | null> = {};

    public audio: AudioEngine;
    public animator: Animator;

    public constructor() {
        this.audio = new AudioEngine();
        this.audio.init();

        this.animator = new Animator(this);
        this.animator.init();
    }

    public init() {
        // todo: start fan noise loop
    }

    public registerNode(name: string, element: HTMLElement | null) {
        this.nodes[name] = element;

        this.log(`Registered node "${name}"`);
    }

    // Office Camera Panning

    public updateMousePosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }

    // Sounds

    public honkFreddysNose() {
        this.audio.playSound('freddy_nose');
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