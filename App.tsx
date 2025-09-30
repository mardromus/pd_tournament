import React, { useState } from 'react';
import { Page, User, Submission } from './types';
import Header from './components/Header';
import Login from './components/Login';
import UsernameModal from './components/UsernameModal';
import Tournament from './components/Tournament';
import Results from './components/Results';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [page, setPage] = useState<Page>(Page.Home);
    const [submissions, setSubmissions] = useState<{ [key: number]: Submission }>({});

    const handleLogin = (provider: 'google' | 'github') => {
        // This is a mock login function. In a real app, this would involve an OAuth flow.
        setTimeout(() => {
            const isGoogle = provider === 'google';
            const randomId = Math.random().toString(36).substring(7);
            setUser({
                googleName: isGoogle ? 'Alex' : 'alex-dev',
                email: isGoogle ? `alex.ray@example.com` : `alex-dev@github.com`,
                picture: `https://i.pravatar.cc/150?u=${randomId}`, // This will be replaced by user's choice
                username: '',
            });
            setShowUsernameModal(true);
        }, 2500); // Increased delay for loading sequence
    };

    const handleLogout = () => {
        setUser(null);
        setPage(Page.Home);
        setSubmissions({});
    };

    const handleProfileSet = (username: string, avatar: string) => {
        if (user) {
            setUser({ ...user, username, picture: avatar });
            setShowUsernameModal(false);
            setPage(Page.Tournament);
        }
    };

    const renderPage = () => {
        switch (page) {
            case Page.Home:
                 return <Home 
                            user={user} 
                            onNavigate={() => setPage(user ? Page.Tournament : Page.Login)} 
                        />;
            case Page.Tournament:
                return (
                    <Tournament
                        submissions={submissions}
                        setSubmissions={setSubmissions}
                        onViewResults={() => setPage(Page.Results)}
                    />
                );
            case Page.Results:
                return (
                    <Results
                        submissions={submissions}
                        onBack={() => setPage(Page.Tournament)}
                        username={user?.username || 'Player'}
                    />
                );
            case Page.Leaderboard:
                return <Leaderboard />;
            case Page.Login:
            default:
                return <Login onLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <Header user={user} onLogout={handleLogout} setPage={setPage} />
            <main className="container mx-auto mt-8">
                {renderPage()}
            </main>
            {showUsernameModal && user && (
                <UsernameModal
                    onSetProfile={handleProfileSet}
                    googleName={user.googleName}
                />
            )}
        </div>
    );
};

export default App;