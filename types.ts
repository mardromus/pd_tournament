export enum Page {
    Home,
    Login,
    Tournament,
    Results,
    Leaderboard,
}

export interface User {
    googleName: string;
    email: string;
    picture: string;
    username: string;
}

export type Language = 'c' | 'cpp' | 'python';

export interface Submission {
    language: Language;
    code: string;
}