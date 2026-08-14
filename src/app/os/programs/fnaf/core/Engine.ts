import { Animator } from "./Animator";
import { AudioEngine } from "./AudioEngine";
import { night, NightManager } from "./NightManager";
import { SceneManager } from "./SceneManager";

export class Engine {
    public mouseX: number = 0;
    public mouseY: number = 0;

    public sceneManager: SceneManager;
    public audio: AudioEngine;
    public animator: Animator;
    public nightManager: NightManager;

    public lDoor: boolean = false;
    public lLight: boolean = false;
    public rDoor: boolean = false;
    public rLight: boolean = false;

    public constructor() {
        this.sceneManager = new SceneManager(this);
        this.audio = new AudioEngine();
        this.animator = new Animator(this);
        this.nightManager = new NightManager(this);
    }

    public init() {
    }

    public openMenu() {
        this.sceneManager.changeScene('menu');
    }

    public startNewGame() {
        this.nightManager.setNight(1);
        this.audio.stopSound('static-long');
        this.sceneManager.changeScene('newspaper');
    }

    public continueGame() {
        this.audio.stopAllSounds();
        this.sceneManager.changeScene('night');
    }

    public finishNight() {
        const night = this.nightManager.getNight();

        if (night < 5) {
            this.nightManager.setNight((night + 1) as night);
        }

        this.resetOfficeState();
        this.sceneManager.changeScene("endNight");

        // schermata di fine gioco se serve

        // stop di tutti i suoni
    }

    public updateMousePosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }

    public toggleDoor(side: 'left' | 'right') {
        side === 'left' ?
            this.lDoor = !this.lDoor
            :
            this.rDoor = !this.rDoor;

        this.sceneManager.updatePanelImg(side);
        this.animator.triggerDoorAnimation(side);
        this.audio.playSound(
            'door',
            1,
            false,
            side === 'left' ? -0.5 : 0.5
        );
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

    private resetOfficeState() {
        this.lDoor = false;
        this.lLight = false;
        this.rDoor = false;
        this.rLight = false;
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
        this.animator.destroy();
        this.sceneManager.destroy();
        this.audio.destroy();
        this.nightManager.destroy();
    }
}