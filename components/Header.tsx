import React from 'react';
import { User, Page } from '../types';
import { LogoutIcon, TrophyIcon } from './icons';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setPage }) => {
    return (
        <header className="container mx-auto flex justify-between items-center p-4 bg-black/30 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
            <div onClick={() => setPage(Page.Home)} className="cursor-pointer">
                <h1 
                    className="text-2xl md:text-4xl font-bold text-cyan-400 tracking-widest uppercase"
                    style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.8)' }}
                >
                    PD Tournament
                </h1>
            </div>
            {user && (
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex items-center space-x-6">
                        <button onClick={() => setPage(Page.Tournament)} className="font-bold text-slate-300 hover:text-cyan-400 transition-colors duration-200">Tournament</button>
                        <button onClick={() => setPage(Page.Results)} className="font-bold text-slate-300 hover:text-cyan-400 transition-colors duration-200">Results</button>
                        <button onClick={() => setPage(Page.Leaderboard)} className="flex items-center gap-2 font-bold text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                           <TrophyIcon className="w-5 h-5" /> Leaderboard
                        </button>
                    </nav>
                    <div className="w-px h-8 bg-slate-600 hidden md:block"></div>
                    <div className="text-right hidden sm:block">
                        <p className="font-bold text-white">{user.username}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                    <img
                        src={user.picture}
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-fuchsia-500"
                    />
                    <button
                        onClick={onLogout}
                        className="p-2 rounded-full bg-slate-700 hover:bg-fuchsia-500/50 text-slate-300 hover:text-white transition-colors duration-200"
                        title="Logout"
                    >
                        <LogoutIcon className="w-6 h-6" />
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;