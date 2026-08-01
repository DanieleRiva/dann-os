import { Engine } from "./Engine";

export class Animator {
    private readonly MOUSE_LOOK_OFFSET = 0.40;
    private readonly MOUSE_LOOK_SPEED = 0.35;

    private officeCameraPos: number = 0;

    private engine: Engine;
    private loopId: number = 0;

    constructor(engine: Engine) {
        this.engine = engine;
        this.loop();
    }

    public init() {
    }

    private loop = () => {
        this.mousePan();

        this.loopId = requestAnimationFrame(this.loop);
    }

    private mousePan() {
        if (this.engine.mouseX < this.MOUSE_LOOK_OFFSET) {
            const panSpeedMultiplier = (this.MOUSE_LOOK_OFFSET - this.engine.mouseX) / this.MOUSE_LOOK_OFFSET;
            this.officeCameraPos += this.MOUSE_LOOK_SPEED * panSpeedMultiplier;
        } else if (this.engine.mouseX > 1 - this.MOUSE_LOOK_OFFSET) {
            const rightBoundary = 1 - this.MOUSE_LOOK_OFFSET;
            const panSpeedMultiplier = (this.engine.mouseX - rightBoundary) / this.MOUSE_LOOK_OFFSET;

            this.officeCameraPos -= this.MOUSE_LOOK_SPEED * panSpeedMultiplier;
        }

        this.officeCameraPos = Math.round(Math.max(this.officeCameraPos, -25) * 100) / 100;
        this.officeCameraPos = Math.round(Math.min(this.officeCameraPos, 0) * 100) / 100;
        this.moveOffice();
    }

    private moveOffice() {
        if (!this.engine.nodes['officeSpace']) {
            return;
        }

        this.engine.nodes['officeSpace'].style.transform = `translateX(${this.officeCameraPos}%)`;
    }

    private animateFan() {

    }

    public destroy() {
        cancelAnimationFrame(this.loopId);
    }
}