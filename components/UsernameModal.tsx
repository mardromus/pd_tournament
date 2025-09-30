import React, { useState } from 'react';

interface UsernameModalProps {
    onSetProfile: (username: string, avatar: string) => void;
    googleName: string;
}

const avatarSvgs = [
    // Avatar 1: Orb
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="4"><circle cx="50" cy="50" r="45" stroke="#22d3ee"/><circle cx="50" cy="50" r="30" stroke="#a5f3fc"/><path d="M20 50 A30 30 0 0 1 80 50" stroke="#06b6d4"/><path d="M50 20 A30 30 0 0 1 50 80" stroke="#06b6d4"/></g></svg>`,
    // Avatar 2: Triangle
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="4"><path d="M50 10 L90 85 H10 Z" stroke="#d946ef" /><path d="M50 35 L75 75 H25 Z" stroke="#f0abfc" /></g></svg>`,
    // Avatar 3: Diamond
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="4"><path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="#f472b6"/><path d="M50 25 L75 50 L50 75 L25 50 Z" stroke="#f9a8d4" fill="#f472b6" fill-opacity="0.2"/></g></svg>`,
    // Avatar 4: Hexagon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="4"><path d="M25 15 L75 15 L95 50 L75 85 L25 85 L5 50 Z" stroke="#6366f1"/><path d="M50 28 L70 39 L70 61 L50 72 L30 61 L30 39 Z" stroke="#a5b4fc"/></g></svg>`,
];

const avatarDataUrls = avatarSvgs.map(svg => `data:image/svg+xml;base64,${btoa(svg)}`);


const UsernameModal: React.FC<UsernameModalProps> = ({ onSetProfile, googleName }) => {
    const [username, setUsername] = useState(googleName.replace(/\s+/g, '_') + Math.floor(Math.random() * 100));
    const [selectedAvatar, setSelectedAvatar] = useState<string>(avatarDataUrls[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onSetProfile(username.trim(), selectedAvatar);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md">
            <div className="bg-slate-800 border border-cyan-500 rounded-lg shadow-glow-cyan p-8 w-full max-w-lg m-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Profile Setup</h2>
                    
                    <div className="mb-6">
                        <label className="block text-slate-300 font-bold mb-2">Choose Your Avatar</label>
                        <div className="flex justify-center items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                            {avatarDataUrls.map((url) => (
                                <button
                                    key={url}
                                    type="button"
                                    onClick={() => setSelectedAvatar(url)}
                                    className={`w-20 h-20 p-1 rounded-full transition-all duration-200 ${selectedAvatar === url ? 'bg-cyan-500 scale-110' : 'bg-slate-700 hover:bg-slate-600'}`}
                                >
                                    <img src={url} alt="Avatar option" className="w-full h-full rounded-full bg-slate-800" />
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="username" className="block text-slate-300 font-bold mb-2">Set Your Challenger Name</label>
                        <p className="text-slate-400 mb-3 text-sm">This name will be displayed on the leaderboards. Make it a good one!</p>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-900 border-2 border-slate-600 focus:border-cyan-500 rounded-md px-4 py-2 text-white outline-none transition-colors"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
                    >
                        Enter the Arena
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsernameModal;