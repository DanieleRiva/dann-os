import { Howl } from 'howler';

type SoundId =
    'freddy-nose'
    | 'blip'
    | 'static'
    | 'static-long'
    | 'fan'
    | 'light';

export class AudioEngine {
    private readonly SOUND_PATHS: Record<SoundId, string> = {
        'freddy-nose': '/programs/fnaf/sounds/PartyFavorraspyPart_AC01__3.wav',
        'blip': '/programs/fnaf/sounds/blip3.wav',
        'static': '/programs/fnaf/sounds/static.wav',
        'static-long': '/programs/fnaf/sounds/static2.wav',
        'fan': '/programs/fnaf/sounds/Buzz_Fan_Florescent2.wav',
        'light': '/programs/fnaf/sounds/BallastHumMedium2.wav',
    }

    private sounds: Record<string, Howl> = {};
    private masterVolume: number = 0.2;

    constructor() {
        Howler.volume(this.masterVolume);
        this.loadSounds();
    }

    public loadSounds() {
        Object.entries(this.SOUND_PATHS).forEach(([key, path]) => {
            const audio = new Howl({ src: path });
            this.sounds[key] = audio;
        });
    }

    public playSound(
        soundId: SoundId,
        volume: number,
        loop?: boolean,
        pan?: number
    ) {
        const sound = this.sounds[soundId];
        sound.volume(volume);

        if (!sound) {
            return;
        }

        if (loop) {
            sound.loop(true);
        }

        if (pan) {
            sound.stereo(pan);
        }
        sound.play();
    }

    public stopSound(soundId: SoundId) {
        const sound = this.sounds[soundId];

        if (!sound) {
            return;
        }

        sound.pause();
    }

    public stopAllSounds() {
        Object.entries(this.sounds).forEach(([key,]) => {
            if (!this.sounds[key]) {
                return;
            }

            this.sounds[key].pause();
        });
    }

    // private log(message: string, ...args: any[]) {
    //     console.log(
    //         `%c AUDIO %c ${message}`,
    //         'background-color: #156d12; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
    //         'background-color: transparent; color: inherit;',
    //         ...args
    //     );
    // }

    public setVolume(volume: number) {
        this.masterVolume = volume;
    }

    public destroy() {
        this.stopAllSounds();
        this.sounds = {};
    }
}