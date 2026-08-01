type SoundId =
    'freddy-nose'
    | 'blip';

export class AudioEngine {
    private readonly SOUND_PATHS: Record<string, string> = {
        'freddy-nose': '/programs/fnaf/sounds/PartyFavorraspyPart_AC01__3.wav',
        'blip': '/programs/fnaf/sounds/blip3.wav'
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
        const sound = this.sounds[soundId]
        sound.volume = this.masterVolume;

        if (!sound) {
            this.log(`Error: couldn't find sound "${soundId}"`);
            return;
        }

        sound.play();
        this.log(`Played "${soundId}"`);
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