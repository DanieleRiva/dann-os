import { Engine } from "./Engine";

export type night = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type hour = 12 | 1 | 2 | 3 | 4 | 5 | 6;

interface animatronic_ai {
    freddy: number,
    bonnie: number,
    chica: number,
    foxy: number
}

export class NightManager {
    private engine: Engine;
    private night: number = 5;
    private hour: number = 12;

    private usage: number = 1;
    private power: number = 100;

    private isRunning: boolean = false;
    private loopId: number = 0;
    private timestamp: number = 0;
    private deltaTime: number = 0;
    private lastFrameTime: number = 0;
    private secondsPerHour: number = 1;
    private time: number = 0;
    private lastHourChange: number = 0;

    private ai: Record<night, animatronic_ai> = {
        1: { freddy: 0, bonnie: 0, chica: 0, foxy: 0 },
        2: { freddy: 0, bonnie: 3, chica: 1, foxy: 1 },
        3: { freddy: 1, bonnie: 0, chica: 5, foxy: 2 },
        4: { freddy: 0, bonnie: 2, chica: 4, foxy: 6 },
        5: { freddy: 3, bonnie: 5, chica: 7, foxy: 5 },
        6: { freddy: 4, bonnie: 10, chica: 12, foxy: 6 },
        7: { freddy: 0, bonnie: 0, chica: 0, foxy: 0 }
    }

    public getNight() { return this.night; }
    public setNight(night: night) { this.night = night; }
    public getHour() { return this.hour; }
    public setHour(hour: hour) { this.hour = hour; }
    public getUsage() { return this.usage; }
    public getPower() { return this.power; }

    constructor(engine: Engine) {
        this.engine = engine;
    }

    public start() {
        this.isRunning = true;

        this.loopId = requestAnimationFrame(this.loop);
    }

    private loop = (timestamp: number) => {
        if (!this.isRunning) return;

        if (this.lastFrameTime === 0) {
            this.lastFrameTime = timestamp;
        }
        this.timestamp = timestamp;
        this.progressTime();

        if (this.isRunning) {
            this.loopId = requestAnimationFrame(this.loop);
        }
    }

    private progressTime() {
        this.deltaTime = this.timestamp - this.lastFrameTime;
        this.lastFrameTime = this.timestamp;
        this.time += this.deltaTime / 1000;

        const hourInterval = Math.floor(this.time / this.secondsPerHour);

        if (hourInterval > this.lastHourChange) {
            this.lastHourChange = hourInterval;
            this.advanceHour();
        }
    }

    private advanceHour() {
        this.setHour((this.hour === 12 ? 1 : this.hour + 1) as hour);
        this.updateAiHourly();

        this.engine.sceneManager.updateOfficeUI(
            this.getHour(),
            this.usage,
            this.power,
        );

        if (this.getHour() > 5) {
            this.destroy();
            this.engine.finishNight();
        }
    }

    private updateAiHourly() {
        const night = this.night;
        const hour = this.hour;

        if (hour === 1) {
            this.ai[night as night].bonnie++;
        }

        if (hour === 3 || hour === 4) {
            this.ai[night as night].bonnie++;
            this.ai[night as night].chica++;
            this.ai[night as night].foxy++;
        }
    }

    public setCustomNight(
        freddy: number,
        bonnie: number,
        chica: number,
        foxy: number
    ) {
        this.ai[7].freddy = freddy;
        this.ai[7].bonnie = bonnie;
        this.ai[7].chica = chica;
        this.ai[7].foxy = foxy;
    }

    public destroy() {
        this.isRunning = false;
        this.setHour(0 as hour);
        this.lastFrameTime = 0;
        this.lastHourChange = 0;
        this.timestamp = 0;
        this.time = 0;

        cancelAnimationFrame(this.loopId);
    }
}