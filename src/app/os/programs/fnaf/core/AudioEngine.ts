type SoundId =
    'freddy-nose'
    | 'blip'
    | 'static'
    | 'static-long';

export class AudioEngine {
    private readonly SOUND_PATHS: Record<string, string> = {
        'freddy-nose': '/programs/fnaf/sounds/PartyFavorraspyPart_AC01__3.wav',
        'blip': '/programs/fnaf/sounds/blip3.wav',
        'static': '/programs/fnaf/sounds/static.wav',
        'static-long': '/programs/fnaf/sounds/static2.wav',
    }

    private sounds: Record<string, HTMLAudioElement> = {};
    private masterVolume: number = 0.2;

    constructor() {
        this.loadSounds();
    }

    public loadSounds() {
        Object.entries(this.SOUND_PATHS).forEach(([key, path]) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            this.sounds[key] = audio;

            this.log(`Loaded "${key}"`);
        });
    }

    public playSound(soundId: SoundId) {
        const sound = this.sounds[soundId];

        if (!sound) {
            this.log(`Error: couldn't find sound "${soundId}"`);
            return;
        }

        sound.volume = this.masterVolume;
        sound.play();

        this.log(`Played "${soundId}"`);
    }

    public stopSound(soundId: SoundId) {
        const sound = this.sounds[soundId];

        if (!sound) {
            this.log(`Error: couldn't find sound "${soundId}"`);
            return;
        }

        sound.pause();
        sound.currentTime = 0;

        this.log(`Stopped "${soundId}"`);
    }

    public stopAllSounds() {
        Object.entries(this.sounds).forEach(([key,]) => {
            if (!this.sounds[key]) {
                this.log(`Error: couldn't find sound "${this.sounds[key]}"`);
                return;
            }

            this.sounds[key].pause();
            this.sounds[key].currentTime = 0;
        });

        this.log(`Stopped all sounds.`);
    }

    public playLoop(soundId: string) {

    }

    private log(message: string, ...args: any[]) {
        console.log(
            `%c AUDIO %c ${message}`,
            'background-color: #156d12; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
            'background-color: transparent; color: inherit;',
            ...args
        );
    }

    public setVolume(volume: number) {
        this.masterVolume = volume;
    }

    public destroy() {
        this.sounds = {};
    }
}