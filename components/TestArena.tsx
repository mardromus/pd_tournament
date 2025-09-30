import React, { useState } from 'react';
import { Submission } from '../types';
import { RobotIcon } from './icons';

interface TestArenaProps {
    submissions: { [key: number]: Submission };
}

const classicBots = [
    { name: 'Always Cooperate', strategy: () => 'C' },
    { name: 'Always Defect', strategy: () => 'D' },
    { name: 'Tit for Tat', strategy: (lastOpponentMove: string) => lastOpponentMove === 'N' ? 'C' : lastOpponentMove },
    { name: 'Random', strategy: () => Math.random() > 0.5 ? 'C' : 'D' },
];

const TestArena: React.FC<TestArenaProps> = ({ submissions }) => {
    const submittedRounds = Object.keys(submissions);
    const [selectedRound, setSelectedRound] = useState<string | null>(submittedRounds.length > 0 ? submittedRounds[0] : null);
    const [selectedBot, setSelectedBot] = useState<(typeof classicBots)[0]>(classicBots[0]);
    const [results, setResults] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const handleRunSimulation = () => {
        if (!selectedRound) return;
        setIsRunning(true);
        setResults([`Simulating your Round ${selectedRound} submission against ${selectedBot.name}...`]);

        // This is a mock simulation. In a real app, you'd send the code to a backend.
        // Here, we just assume the user's code always returns 'C' for simplicity.
        const userStrategy = () => 'C'; 

        setTimeout(() => {
            const log: string[] = [];
            let opponentLastMove = 'N';
            let userScore = 0;
            let botScore = 0;

            for (let i = 1; i <= 10; i++) {
                const userMove = userStrategy();
                const botMove = selectedBot.strategy(opponentLastMove);
                
                if (userMove === 'C' && botMove === 'C') {
                    userScore += 3; botScore += 3;
                } else if (userMove === 'C' && botMove === 'D') {
                    userScore += 0; botScore += 5;
                } else if (userMove === 'D' && botMove === 'C') {
                    userScore += 5; botScore += 0;
                } else { // D vs D
                    userScore += 1; botScore += 1;
                }

                log.push(`[Move ${i}] You: ${userMove}, ${selectedBot.name}: ${botMove}`);
                opponentLastMove = userMove;
            }
            log.push(`\nFinal Score -> You: ${userScore}, ${selectedBot.name}: ${botScore}`);
            setResults(prev => [...prev, ...log]);
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Strategy Sandbox</h2>
            <div className="bg-slate-800/50 border border-fuchsia-500/30 rounded-xl p-6 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Controls */}
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-fuchsia-300 mb-2">1. Select Your Strategy</label>
                        {submittedRounds.length > 0 ? (
                             <select
                                value={selectedRound || ''}
                                onChange={e => setSelectedRound(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                            >
                                {submittedRounds.map(r => <option key={r} value={r}>From Round {r}</option>)}
                            </select>
                        ) : (
                            <p className="text-sm text-slate-400 p-2 bg-slate-700/50 rounded-md">Submit code in a round above to test it.</p>
                        )}
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-fuchsia-300 mb-2">2. Choose Opponent</label>
                        <div className="space-y-2">
                        {classicBots.map(bot => (
                            <button
                                key={bot.name}
                                onClick={() => setSelectedBot(bot)}
                                className={`w-full flex items-center gap-3 text-left p-3 rounded-md border-2 transition-colors ${selectedBot.name === bot.name ? 'bg-fuchsia-500/20 border-fuchsia-500' : 'bg-slate-900/50 border-slate-700 hover:border-fuchsia-500/50'}`}
                            >
                                <RobotIcon className="w-6 h-6 text-fuchsia-400 flex-shrink-0" />
                                <span>{bot.name}</span>
                            </button>
                        ))}
                        </div>
                    </div>
                    <button
                        onClick={handleRunSimulation}
                        disabled={!selectedRound || isRunning}
                        className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-md transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRunning ? 'Simulating...' : 'Run Simulation'}
                    </button>
                </div>

                {/* Results */}
                <div className="md:col-span-2 bg-slate-900 rounded-lg p-4 h-96 flex flex-col">
                    <h4 className="font-bold text-slate-300 mb-2 font-mono">Simulation Log</h4>
                    <div className="flex-grow overflow-y-auto font-mono text-sm text-slate-400 space-y-1 pr-2">
                        {results.map((line, i) => (
                            <p key={i} className={`${line.startsWith('Final') ? 'text-fuchsia-300 font-bold pt-2' : ''} ${line.startsWith('[Move') ? 'text-cyan-300' : ''}`}>{`> ${line}`}</p>
                        ))}
                         {results.length === 0 && <p>&gt; Results will be displayed here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestArena;