import React, { useState, useEffect } from 'react';
import { GoogleIcon, GithubIcon } from './icons';

interface LoginProps {
    onLogin: (provider: 'google' | 'github') => void;
}

const loadingMessages = [
    'Initializing connection...',
    'Authenticating challenger...',
    'Entering the arena...',
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState<false | 'google' | 'github'>(false);
    const [loadingStep, setLoadingStep] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingStep(prev => (prev + 1) % loadingMessages.length);
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isLoading]);


    const handleLoginClick = (provider: 'google' | 'github') => {
        setIsLoading(provider);
        onLogin(provider);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="max-w-3xl w-full bg-slate-800/50 border border-fuchsia-500/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-sm">
                <h2 className="text-4xl md:text-5xl font-bold text-fuchsia-400 mb-4 tracking-wide">Revisiting the Prisoner's Dilemma</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    Welcome to an advanced iteration of the classic tournament. Here, your strategy, coded and executed, will be pitted against others in a multi-round challenge. Each round introduces new complexities, pushing the boundaries of game theory. Will you cooperate, defect, or devise a strategy yet unseen?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => handleLoginClick('google')}
                        disabled={!!isLoading}
                        className="flex items-center justify-center space-x-3 px-8 py-4 bg-slate-800 border-2 border-cyan-400 rounded-lg text-xl font-bold text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait animate-pulse-glow w-full sm:w-80"
                    >
                        {isLoading === 'google' ? (
                             <span className="font-mono">{loadingMessages[loadingStep]}</span>
                        ) : (
                            <>
                                <GoogleIcon className="w-7 h-7" />
                                <span>Login with Google</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => handleLoginClick('github')}
                        disabled={!!isLoading}
                        className="flex items-center justify-center space-x-3 px-8 py-4 bg-slate-800 border-2 border-slate-400 rounded-lg text-xl font-bold text-slate-300 hover:bg-slate-300 hover:text-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait w-full sm:w-80"
                    >
                        {isLoading === 'github' ? (
                             <span className="font-mono">{loadingMessages[loadingStep]}</span>
                        ) : (
                            <>
                                <GithubIcon className="w-7 h-7" />
                                <span>Login with GitHub</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;