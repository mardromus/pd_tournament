
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Submission } from '../types';
import { ChevronLeftIcon } from './icons';

interface ResultsProps {
    submissions: { [key: number]: Submission };
    onBack: () => void;
    username: string;
}

// Mock data for demonstration
const round1MockData = {
    matches: [
        { id: 1, opponent: 'AlwaysCooperate', yourMove: 'C', opponentMove: 'C', score: 3 },
        { id: 2, opponent: 'AlwaysDefect', yourMove: 'C', opponentMove: 'D', score: 0 },
        { id: 3, opponent: 'TitForTat', yourMove: 'D', opponentMove: 'C', score: 5 },
        { id: 4, opponent: 'RandomBot', yourMove: 'D', opponentMove: 'D', score: 1 },
        { id: 5, opponent: 'TitForTat', yourMove: 'C', opponentMove: 'D', score: 0 },
        { id: 6, opponent: 'AlwaysCooperate', yourMove: 'C', opponentMove: 'C', score: 3 },
        { id: 7, opponent: 'AlwaysDefect', yourMove: 'D', opponentMove: 'D', score: 1 },
        { id: 8, opponent: 'RandomBot', yourMove: 'C', opponentMove: 'C', score: 3 },
    ],
    summary: {
        totalScore: 16,
        cooperations: 5,
        defections: 3,
    },
};

const chartData = [
    { name: 'Your Moves', Cooperate: round1MockData.summary.cooperations, Defect: round1MockData.summary.defections },
];


const Results: React.FC<ResultsProps> = ({ submissions, onBack, username }) => {
    const hasSubmittedRound1 = !!submissions[1];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full bg-slate-700 hover:bg-cyan-500/50 text-slate-300 hover:text-white transition-colors duration-200">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-bold text-slate-100">Results & Analysis</h2>
            </div>
            
            <div className="bg-slate-800/50 border border-fuchsia-500/30 rounded-xl p-6 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">Round 1 Analysis</h3>
                
                {!hasSubmittedRound1 ? (
                    <p className="text-slate-400 text-center py-8">You have not submitted a strategy for Round 1. No results to display.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold text-slate-200 mb-3">Performance Summary</h4>
                            <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Player:</span>
                                    <span className="font-bold text-white">{username}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Total Score:</span>
                                    <span className="font-bold text-fuchsia-400 text-lg">{round1MockData.summary.totalScore}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Times Cooperated:</span>
                                    <span className="font-bold text-cyan-400">{round1MockData.summary.cooperations}</span>
                                </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Times Defected:</span>
                                    <span className="font-bold text-orange-400">{round1MockData.summary.defections}</span>
                                </div>
                            </div>

                             <h4 className="text-xl font-semibold text-slate-200 mt-6 mb-3">Match Log (Sample)</h4>
                             <div className="max-h-60 overflow-y-auto bg-slate-900/50 rounded-lg p-2">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-400 uppercase">
                                        <tr>
                                            <th className="p-2">Opponent</th>
                                            <th className="p-2 text-center">Your Move</th>
                                            <th className="p-2 text-center">Their Move</th>
                                            <th className="p-2 text-right">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-200">
                                        {round1MockData.matches.map(m => (
                                            <tr key={m.id} className="border-b border-slate-700 last:border-0">
                                                <td className="p-2 font-medium">{m.opponent}</td>
                                                <td className={`p-2 text-center font-bold ${m.yourMove === 'C' ? 'text-cyan-400' : 'text-orange-400'}`}>{m.yourMove}</td>
                                                <td className={`p-2 text-center font-bold ${m.opponentMove === 'C' ? 'text-cyan-400' : 'text-orange-400'}`}>{m.opponentMove}</td>
                                                <td className="p-2 text-right font-semibold text-fuchsia-400">{m.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                        <div className="min-h-[300px]">
                             <h4 className="text-xl font-semibold text-slate-200 mb-3">Move Distribution</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                    <XAxis type="number" stroke="#94a3b8"/>
                                    <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(30, 41, 59, 0.5)'}}
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="Cooperate" fill="#22d3ee" stackId="a" />
                                    <Bar dataKey="Defect" fill="#fb923c" stackId="a" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
            <p className="text-center text-slate-500 text-sm">Analysis for rounds 2 and 3 will be available after they conclude.</p>
        </div>
    );
};

export default Results;
