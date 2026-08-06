import { timeStamp } from "console";
import { Engine } from "./Engine";

type animationId =
    'freddy-menu'
    | 'static-full'
    | 'fan';
interface animationConfig {
    path: string,
    frameCount: number
}

export class Animator {
    private readonly DELTA_TIME = 0.16;
    private readonly MOUSE_LOOK_OFFSET = 0.40;
    private readonly MOUSE_LOOK_SPEED = 5;

    private officeCameraPos: number = 0;

    private engine: Engine;
    private loopId: number = 0;

    private timestamp: number = 0;

    private readonly ANIMATIONS: Record<animationId, animationConfig> = {
        'freddy-menu': {
            path: '/programs/fnaf/staticAndMenu/menu/',
            frameCount: 4
        },
        'static-full': {
            path: '/programs/fnaf/staticAndMenu/fullStatic/',
            frameCount: 8
        },
        'fan': {
            path: '/programs/fnaf/office/fan/',
            frameCount: 3
        },
    };

    private animStates: Record<string, { currentFrame: number; lastUpdateTime: number }> = {
        'freddy-menu': { currentFrame: 0, lastUpdateTime: 0 },
        'static-full': { currentFrame: 0, lastUpdateTime: 0 },
        'fan': { currentFrame: 0, lastUpdateTime: 0 }
    };

    constructor(engine: Engine) {
        this.engine = engine;
        this.loopId = requestAnimationFrame(this.loop);
    }

    public init() {
    }

    private loop = (timestamp: number) => {
        this.timestamp = timestamp;
        this.mousePan();
        this.animateMenu();
        this.animateFan();

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
            state.currentFrame = (state.currentFrame + 1) % config.frameCount;
            state.lastUpdateTime = this.timestamp;

            img.src = `${config.path}/${state.currentFrame}.png`;
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
    }

    public destroy() {
        cancelAnimationFrame(this.loopId);
    }
}