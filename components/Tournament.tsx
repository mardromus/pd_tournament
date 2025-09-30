import React, { useState, useMemo } from 'react';
import { Submission, Language } from '../types';
import IDE from './IDE';
import TestArena from './TestArena';
import { EyeIcon, LockClosedIcon, CheckCircleIcon, SignalNoiseIcon, FogIcon, HintIcon } from './icons';

interface TournamentProps {
    submissions: { [key: number]: Submission };
    setSubmissions: React.Dispatch<React.SetStateAction<{ [key: number]: Submission }>>;
    onViewResults: () => void;
}

const roundDetails = [
    {
        title: 'Round 1: The Arena of Noise',
        mission: "This round establishes a baseline and tests the robustness of fundamental strategies. It's a modern take on the classic setup.",
        twist: {
            title: 'Signal Corruption',
            icon: SignalNoiseIcon,
            description: "There is a 5% chance on every turn that your move will be flipped before your opponent sees it (a Cooperate becomes a Defect, or vice versa). This tests an agent's forgiveness and its ability to recover from misunderstandings."
        },
        goal: "Design a strategy that is not only effective but also resilient and capable of re-establishing cooperation after an apparent, but unintended, betrayal."
    },
    {
        title: 'Round 2: The Adaptive Gauntlet',
        mission: "Here, we move beyond static rules to test agents that can learn and adapt to their opponents' behavior in real-time.",
        twist: {
            title: 'The Fog of War',
            icon: FogIcon,
            description: "For 10% of the turns, your agent will not be told what the opponent's last move was. Your agent will receive an 'U' (UNKNOWN) signal instead of 'C' or 'D'. This rewards agents that can successfully model their opponent's general tendencies."
        },
        goal: "Develop an agent that can build a 'profile' of its opponent to make intelligent decisions even with incomplete information."
    },
    {
        title: 'Round 3: The Oracle\'s Gambit',
        mission: "The final round is a test of meta-cognition, deception, and the ability to interpret signals in a complex communication game.",
        twist: {
            title: 'The Oracle\'s Hint',
            icon: HintIcon,
            description: "Before each turn, you submit your actual move AND a 'hint' to send to your opponent (e.g., signal 'C' while playing 'D'). Your opponent receives your hint just before they make their own move. Will you be truthful or deceptive?"
        },
        goal: "Create an agent that can navigate a world of potential misinformation, interpreting the hints of others while using its own to manipulate the game."
    }
];

const Tournament: React.FC<TournamentProps> = ({ submissions, setSubmissions, onViewResults }) => {
    const [activeRound, setActiveRound] = useState(1);
    const [useForAll, setUseForAll] = useState(false);
    const highestUnlockedRound = 3; // All rounds are unlocked now

    const handleSubmissionChange = (language: Language, code: string) => {
        const newSubmissions = { ...submissions };
        newSubmissions[activeRound] = { language, code };
        
        if (useForAll) {
            for (let i = activeRound + 1; i <= roundDetails.length; i++) {
                 if (i <= highestUnlockedRound && !newSubmissions[i]) { // Only fill unlocked and un-submitted rounds
                    newSubmissions[i] = { language, code };
                }
            }
        }
        setSubmissions(newSubmissions);
    };

    const currentSubmission = useMemo(() => submissions[activeRound] || { language: 'python', code: '' }, [submissions, activeRound]);
    const currentRoundDetail = roundDetails[activeRound - 1];

    return (
        <div className="space-y-12">
            <div>
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold text-slate-100 uppercase tracking-wider">Tournament Stages</h2>
                    <button onClick={onViewResults} className="flex items-center gap-2 px-6 py-2 bg-fuchsia-500/80 hover:bg-fuchsia-500 text-white font-bold rounded-md transition-transform transform hover:scale-105 shadow-lg shadow-fuchsia-500/30">
                        <EyeIcon className="w-5 h-5"/>
                        View Results
                    </button>
                </div>
                
                <div className="flex items-center justify-center space-x-4 md:space-x-8 relative mb-12">
                     {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700/50 -translate-y-1/2 z-0"></div>
                    
                    {roundDetails.map((_, index) => {
                        const roundNum = index + 1;
                        const isUnlocked = roundNum <= highestUnlockedRound;
                        const isActive = roundNum === activeRound;
                        const isSubmitted = !!submissions[roundNum];

                        let statusBadge;
                        if (isSubmitted) {
                            statusBadge = <div className="absolute -top-3 -right-3 flex items-center gap-1 text-xs bg-green-500 text-white font-bold px-2 py-1 rounded-full"><CheckCircleIcon className="w-4 h-4" /> SUBMITTED</div>;
                        } else if (isActive) {
                             statusBadge = <div className="absolute -top-3 -right-3 text-xs bg-cyan-500 text-black font-bold px-3 py-1 rounded-full animate-pulse">ACTIVE</div>;
                        } else if (!isUnlocked) {
                             statusBadge = <div className="absolute -top-3 -right-3 flex items-center gap-1 text-xs bg-slate-600 text-slate-200 font-bold px-2 py-1 rounded-full"><LockClosedIcon className="w-4 h-4" /> LOCKED</div>;
                        }

                        return (
                            <div key={roundNum} className="relative z-10">
                                <button
                                    onClick={() => isUnlocked && setActiveRound(roundNum)}
                                    disabled={!isUnlocked}
                                    className={`relative flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56 p-4 text-center rounded-2xl border-4 transition-all duration-300 transform 
                                        ${isActive ? 'bg-cyan-900/50 border-cyan-400 shadow-glow-cyan scale-110' : ''}
                                        ${!isActive && isUnlocked ? 'bg-slate-800 border-slate-600 hover:border-cyan-500 hover:scale-105' : ''}
                                        ${!isUnlocked ? 'bg-slate-900/80 border-slate-700 text-slate-500 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {statusBadge}
                                    <div className={`font-orbitron font-black text-7xl transition-colors ${isActive ? 'text-cyan-300' : isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {roundNum}
                                    </div>
                                    <h3 className={`text-xl font-bold mt-2 transition-colors ${isActive ? 'text-white' : isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>{roundDetails[index].title.split(':')[1]}</h3>
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm mt-6">
                    <h3 className="text-3xl font-bold text-cyan-400 mb-6">{currentRoundDetail.title}</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-xl font-bold text-slate-200">The Mission</h4>
                            <p className="text-slate-300 leading-relaxed">{currentRoundDetail.mission}</p>
                            <h4 className="text-xl font-bold text-slate-200 pt-2">The Goal</h4>
                            <p className="text-slate-300 leading-relaxed">{currentRoundDetail.goal}</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center text-center">
                            <h4 className="text-xl font-bold text-slate-200 mb-4">The Twist</h4>
                            <currentRoundDetail.twist.icon className="w-20 h-20 text-cyan-400 mb-4" />
                            <h5 className="text-lg font-bold text-cyan-300">{currentRoundDetail.twist.title}</h5>
                            <p className="text-slate-400 text-sm mt-2">{currentRoundDetail.twist.description}</p>
                        </div>
                    </div>

                    <IDE
                        submission={currentSubmission}
                        onSubmissionChange={handleSubmissionChange}
                        round={activeRound}
                    />
                    <div className="mt-4 flex items-center justify-end space-x-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useForAll}
                                onChange={(e) => setUseForAll(e.target.checked)}
                                className="form-checkbox h-5 w-5 bg-slate-700 border-slate-500 rounded text-cyan-500 focus:ring-cyan-500"
                            />
                            <span className="ml-2 text-slate-300">Use this code for all subsequent, un-submitted rounds</span>
                        </label>
                    </div>
                </div>
            </div>

            <TestArena submissions={submissions} />
        </div>
    );
};

export default Tournament;