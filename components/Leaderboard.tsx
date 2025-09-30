import React from 'react';
import { TrophyIcon } from './icons';

const Leaderboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="max-w-3xl w-full bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm">
                 <TrophyIcon className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 tracking-wide">Leaderboard</h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                    The leaderboard is currently being calculated. Check back after the first round concludes to see where you stand among the strategists.
                </p>
                 <p className="text-slate-500 mt-4 animate-pulse font-mono">
                    COMING SOON...
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;