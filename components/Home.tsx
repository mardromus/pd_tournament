import React from 'react';
import { User } from '../types';
import { ChevronRightIcon } from './icons';

interface HomeProps {
    user: User | null;
    onNavigate: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-4 sm:p-8 mt-10 space-y-12">
            {/* Main Intro */}
            <div className="max-w-4xl w-full bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm">
                <h2 className="text-4xl md:text-6xl font-bold text-cyan-300 mb-6 tracking-wide uppercase animate-text-flicker">The Neo-Cooperator's Gambit</h2>
                <div className="text-left text-slate-300 space-y-4 leading-relaxed max-w-3xl mx-auto">
                    <p>
                        In the 1980s, a simple, cooperative strategy won a legendary tournament. Today, we reboot the experiment for the age of AI. This tournament re-imagines the classic test through three evolving rounds, each designed to push the boundaries of strategy.
                    </p>
                     <p className="font-bold text-slate-100 pt-4">
                        The arena has evolved. Will you?
                    </p>
                    <p>
                       You will face signal corruption, incomplete information, and even outright deception. The original question returns with a new urgency: As complexity grows, can a 'nice' algorithm still prevail? Or has the time for ruthless logic finally arrived?
                    </p>
                </div>
            </div>

            {/* Payoff Matrix */}
            <div className="max-w-4xl w-full">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">The Dilemma & The Payoff</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* You Cooperate, They Cooperate */}
                    <div className="bg-slate-900/50 border-2 border-cyan-500 rounded-lg p-6 text-left space-y-3">
                        <h4 className="text-xl font-bold text-cyan-400">Mutual Cooperation</h4>
                        <p className="text-sm text-slate-400">You both choose to Cooperate.</p>
                        <div className="flex justify-between items-baseline text-lg pt-2">
                            <span className="font-semibold">Your Score: <span className="text-cyan-400 font-bold text-3xl">3</span></span>
                            <span className="font-semibold">Opponent Score: <span className="text-cyan-400 font-bold text-3xl">3</span></span>
                        </div>
                    </div>
                    {/* You Defect, They Defect */}
                     <div className="bg-slate-900/50 border-2 border-fuchsia-500 rounded-lg p-6 text-left space-y-3">
                        <h4 className="text-xl font-bold text-fuchsia-400">Mutual Destruction</h4>
                        <p className="text-sm text-slate-400">You both choose to Defect.</p>
                         <div className="flex justify-between items-baseline text-lg pt-2">
                            <span className="font-semibold">Your Score: <span className="text-fuchsia-400 font-bold text-3xl">1</span></span>
                            <span className="font-semibold">Opponent Score: <span className="text-fuchsia-400 font-bold text-3xl">1</span></span>
                        </div>
                    </div>
                     {/* You Defect, They Cooperate */}
                    <div className="bg-slate-900/50 border-2 border-fuchsia-500 rounded-lg p-6 text-left space-y-3">
                        <h4 className="text-xl font-bold text-fuchsia-400">Betrayal</h4>
                        <p className="text-sm text-slate-400">You <span className="font-bold">Defect</span>, opponent <span className="font-bold">Cooperates</span>.</p>
                        <div className="flex justify-between items-baseline text-lg pt-2">
                            <span className="font-semibold">Your Score: <span className="text-fuchsia-400 font-bold text-3xl">5</span></span>
                            <span className="font-semibold">Opponent Score: <span className="text-slate-400 font-bold text-3xl">0</span></span>
                        </div>
                    </div>
                    {/* You Cooperate, They Defect */}
                    <div className="bg-slate-900/50 border-2 border-cyan-500 rounded-lg p-6 text-left space-y-3">
                        <h4 className="text-xl font-bold text-cyan-400">Sucker's Payoff</h4>
                        <p className="text-sm text-slate-400">You <span className="font-bold">Cooperate</span>, opponent <span className="font-bold">Defects</span>.</p>
                        <div className="flex justify-between items-baseline text-lg pt-2">
                            <span className="font-semibold">Your Score: <span className="text-slate-400 font-bold text-3xl">0</span></span>
                            <span className="font-semibold">Opponent Score: <span className="text-fuchsia-400 font-bold text-3xl">5</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tournament Format & Conclusion */}
            <div className="max-w-4xl w-full bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">Tournament Format</h3>
                <div className="text-left text-slate-300 space-y-4 leading-relaxed max-w-3xl mx-auto">
                    <p>
                        Each match consists of 200 turns against an opponent, allowing strategies to unfold over time. The overall tournament is a <span className="font-bold text-cyan-400">round-robin</span>: every submitted strategy will be pitted against every other strategy to find the ultimate victor.
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={onNavigate}
                        className="flex items-center justify-center space-x-3 px-8 py-4 bg-slate-800 border-2 border-fuchsia-400 rounded-lg text-xl font-bold text-fuchsia-400 hover:bg-fuchsia-400 hover:text-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait animate-pulse-glow-fuchsia"
                    >
                        <span>{user ? 'Enter The Arena' : 'Join The Tournament'}</span>
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
