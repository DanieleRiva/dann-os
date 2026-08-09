import { timeStamp } from "console";
import { Engine } from "./Engine";

type animationId =
    'freddy-menu'
    | 'static-full'
    | 'fan'
    | 'lDoor'
    | 'rDoor';
interface animationConfig {
    path: string,
    frameCount: number,
    loop: boolean
}

export class Animator {
    private readonly DELTA_TIME = 0.16;
    private readonly MOUSE_LOOK_OFFSET = 0.40;
    private readonly MOUSE_LOOK_SPEED = 6;

    private officeCameraPos: number = 0;

    private engine: Engine;
    private loopId: number = 0;

    private timestamp: number = 0;

    private readonly ANIMATIONS: Record<animationId, animationConfig> = {
        'freddy-menu': {
            path: '/programs/fnaf/staticAndMenu/menu/',
            frameCount: 4,
            loop: true
        },
        'static-full': {
            path: '/programs/fnaf/staticAndMenu/fullStatic/',
            frameCount: 8,
            loop: true
        },
        'fan': {
            path: '/programs/fnaf/office/fan/',
            frameCount: 3,
            loop: true
        },
        'lDoor': {
            path: '/programs/fnaf/office/doorsAndLights/lDoor',
            frameCount: 14,
            loop: false
        },
        'rDoor': {
            path: '/programs/fnaf/office/doorsAndLights/rDoor',
            frameCount: 14,
            loop: false
        },
    };

    private animStates: Record<animationId, { currentFrame: number; lastUpdateTime: number }> = {
        'freddy-menu': { currentFrame: 0, lastUpdateTime: 0 },
        'static-full': { currentFrame: 0, lastUpdateTime: 0 },
        'fan': { currentFrame: 0, lastUpdateTime: 0 },
        'lDoor': { currentFrame: 0, lastUpdateTime: 0 },
        'rDoor': { currentFrame: 0, lastUpdateTime: 0 },
    };

    constructor(engine: Engine) {
        this.engine = engine;
        this.loopId = requestAnimationFrame(this.loop);
    }

    private loop = (timestamp: number) => {
        this.timestamp = timestamp;
        this.mousePan();
        this.animateMenu();
        this.animateFan();

        this.animateDoors();

        this.loopId = requestAnimationFrame(this.loop);
    }

    private mousePan() {
        if (this.engine.mouseX < this.MOUSE_LOOK_OFFSET) {
            const panSpeedMultiplier = (this.MOUSE_LOOK_OFFSET - this.engine.mouseX) / this.MOUSE_LOOK_OFFSET;

            this.officeCameraPos += this.MOUSE_LOOK_SPEED * panSpeedMultiplier * this.DELTA_TIME;

        } else if (this.engine.mouseX > 1 - this.MOUSE_LOOK_OFFSET) {
            const rightBoundary = 1 - this.MOUSE_LOOK_OFFSET;
            const panSpeedMultiplier = (this.engine.mouseX - rightBoundary) / this.MOUSE_LOOK_OFFSET;

            this.officeCameraPos -= this.MOUSE_LOOK_SPEED * panSpeedMultiplier * this.DELTA_TIME;
        }

        this.officeCameraPos = Math.max(-25, Math.min(this.officeCameraPos, 0));
        this.moveOffice();
    }

    private moveOffice() {
        if (!this.engine.nodes['officeSpace']) return;

        this.engine.nodes['officeSpace'].style.transform = `translateX(${this.officeCameraPos}%)`;
    }

    private animate(
        animId: animationId,
        img: HTMLImageElement,
        fps: number
    ) {
        const state = this.animStates[animId];
        const config = this.ANIMATIONS[animId];
        const msPerFrame = 1000 / fps;

        if (this.timestamp - state.lastUpdateTime > msPerFrame) {
            if (config.loop) {
                state.currentFrame = (state.currentFrame + 1) % config.frameCount;
                img.src = `${config.path}/${state.currentFrame}.png`;
            } else {
                if (state.currentFrame + 1 < config.frameCount) {
                    state.currentFrame++;
                    img.src = `${config.path}/${state.currentFrame}.png`;
                }
            }

            state.lastUpdateTime = this.timestamp;
        }
    }

    private animateJitter(
        animId: animationId,
        img: HTMLImageElement,
        fps: number,
        rareFrame: number,
    ) {
        const state = this.animStates[animId];
        const config = this.ANIMATIONS[animId];
        const msPerFrame = 1000 / fps;

        if (this.timestamp - state.lastUpdateTime > msPerFrame) {
            const rng = Math.random();

            if (rng <= 0.33) {
                state.currentFrame = 0;
            } else if (rng > 0.33 && rng <= 0.95) {
                return;
            } else if (rng > 0.95 && rng <= 0.99) {
                do {
                    state.currentFrame = Math.floor(Math.random() * config.frameCount);
                } while (state.currentFrame === rareFrame || state.currentFrame === 0);
            } else {
                state.currentFrame = rareFrame;
            }

            state.lastUpdateTime = this.timestamp;
            img.src = `${config.path}/${state.currentFrame}.png`;
        }
    }

    private animateMenu() {
        if (this.engine.sceneManager.getSceneName() !== 'menu') return;

        const freddy = this.engine.sceneManager.menuElements['freddy-menu'];
        const staticFull = this.engine.sceneManager.menuElements['static-full'];
        if (!freddy || !staticFull) return;

        this.animate(
            'static-full',
            staticFull,
            30
        );

        this.animateJitter(
            'freddy-menu',
            freddy,
            8,
            3
        );
    }

    private animateFan() {
        if (this.engine.sceneManager.getSceneName() !== 'game') return;

        const fan = this.engine.sceneManager.officeElements['fan'];
        if (!fan) return;

        this.animate(
            'fan',
            fan,
            30
        );
    }

    private animateDoors() {
        if (this.engine.sceneManager.getSceneName() !== 'game') return;

        const lDoor = this.engine.sceneManager.officeElements['l-door'];
        const rDoor = this.engine.sceneManager.officeElements['r-door'];

        if (lDoor) {
            lDoor.style.opacity = "1";
            this.animate(
                'lDoor',
                lDoor,
                30
            );
            lDoor.style.opacity = "0";
        }

        if (rDoor) {
            rDoor.style.opacity = "1";
            this.animate(
                'rDoor',
                rDoor,
                30
            );
            rDoor.style.opacity = "0";
        }
    }

    public triggerDoorAnimation(side: 'left' | 'right') {
        if (this.engine.sceneManager.getSceneName() !== 'game') return;

        var doorState;
        if (side === 'left') {
            doorState = this.animStates['lDoor'];
        } else {
            doorState = this.animStates['rDoor'];
        }

        if (!doorState) return;

        console.log(doorState);

        doorState.currentFrame = 0;
        doorState.lastUpdateTime = this.timestamp;
    }

    public destroy() {
        cancelAnimationFrame(this.loopId);
    }
}