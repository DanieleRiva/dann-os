export type Move = 'rock' | 'paper' | 'scissors';
export type Result = 'win' | 'lose' | 'draw';
export type State = 'menu' | 'playing' | 'result';

export interface Data {
    state: State;
    userMove: Move | null;
    cpuMove: Move | null;
    result: Result | null;
    wins: number;
    losses: number;
    draws: number;
    highScore: number;
}

const BEATS: Record<Move, Move> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

export const MOVES: Move[] = ['paper', 'rock', 'scissors'];

export const BUTTONS_IMAGES: Record<Move, string> = {
    scissors: '/programs/rps/buttons/scissors.png',
    rock: '/programs/rps/buttons/rock.png',
    paper: '/programs/rps/buttons/paper.png',
}
export const BUTTONS_ORIGIN: Record<Move, string> = {
    paper: '32% 32%',
    rock: '68% 32%',
    scissors: '50% 70%',
};

export const BUTTON_POS: Record<Move, { top: string; left: string }> = {
    paper: { top: '30%', left: '30%' },
    rock: { top: '30%', left: '70%' },
    scissors: { top: '68%', left: '50%' },
};

export function createGame(): Data {
    return {
        state: 'menu',
        userMove: null,
        cpuMove: null,
        result: null,
        wins: 0,
        losses: 0,
        draws: 0,
        highScore: 0,
    };
}

export function cpuMove(): Move {
    return MOVES[
        Math.floor(Math.random() * MOVES.length)
    ];
}

export function playRound(userMove: Move): [Result, Move] {
    const cpu = cpuMove();

    if (cpu === userMove) {
        return ['draw', cpu];
    }

    return BEATS[userMove] === cpu
        ? ['win', cpu]
        : ['lose', cpu];
}