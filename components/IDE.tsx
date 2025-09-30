import React, { useState, useEffect } from 'react';
import { Submission, Language } from '../types';
import { CheckCircleIcon, PlayIcon, XCircleIcon } from './icons';

interface IDEProps {
    submission: Submission;
    onSubmissionChange: (language: Language, code: string) => void;
    round: number;
}

const placeholderCode: { [key: number]: { [key in Language]: string } } = {
    1: { // Arena of Noise
        python: `def solve():
    # INSTRUCTIONS:
    # Your function must return a single character: 'C' for Cooperate, 'D' for Defect.
    # In this round, there's a 5% chance your move will be flipped by "noise"
    # before the opponent sees it. A forgiving strategy might be advantageous.
    
    # Example: A simple "Always Cooperate" strategy.
    return 'C'
`,
        cpp: `#include <iostream>
#include <string>

// INSTRUCTIONS:
// Your program must output a single character to stdout: 'C' or 'D'.
// Note: there is a 5% chance your move will be flipped by "noise".
// A robust strategy should be able to handle unexpected defections.
int main() {
    // Example: Always Cooperate
    std::cout << "C";
    return 0;
}
`,
        c: `#include <stdio.h>

// INSTRUCTIONS:
// Your program must output a single character to stdout: 'C' or 'D'.
// Note: there is a 5% chance your move will be flipped by "noise".
// Consider how to avoid long cycles of mutual retaliation.
int main() {
    // Example: Always Defect
    printf("D");
    return 0;
}
`
    },
    2: { // Adaptive Gauntlet
        python: `def solve(opponent_last_move):
    # INSTRUCTIONS:
    # 'opponent_last_move' is a single character:
    # 'C' (Cooperate), 'D' (Defect), 'N' (None, for the first turn),
    # or 'U' (Unknown) due to "The Fog of War".
    # Your function must return 'C' or 'D'.

    # Example: A simple Tit for Tat, which treats 'Unknown' as 'Cooperate'.
    if opponent_last_move == 'D':
        return 'D'
    
    # Cooperate on 'C', 'N', or 'U'
    return 'C'
`,
        cpp: `#include <iostream>
#include <string>

// INSTRUCTIONS:
// The opponent's last move is passed as a command-line argument.
// argv[1] will be a string: "C", "D", "N" (for first turn), or "U" (Unknown).
// Your program must output 'C' or 'D' to stdout.
int main(int argc, char* argv[]) {
    if (argc > 1) {
        std::string opponent_move = argv[1];
        if (opponent_move == "D") {
            std::cout << "D";
            return 0;
        }
    }
    // Cooperate by default, on first turn, or if move is unknown.
    std::cout << "C";
    return 0;
}
`,
        c: `#include <stdio.h>
#include <string.h>

// INSTRUCTIONS:
// The opponent's last move is passed as a command-line argument.
// argv[1] will be a string: "C", "D", "N" (for first turn), or "U" (Unknown).
// Your program must output 'C' or 'D' to stdout.
int main(int argc, char* argv[]) {
    if (argc > 1 && strcmp(argv[1], "D") == 0) {
        printf("D");
    } else {
        printf("C");
    }
    return 0;
}
`
    },
    3: { // Oracle's Gambit
        python: `def solve(history):
    # INSTRUCTIONS:
    # You must return a tuple of two characters: (your_move, your_hint).
    # 'history' is a list of past turns. Each turn is a tuple containing:
    # (your_actual_move, opponent_actual_move, your_sent_hint, opponent_received_hint)
    # Example for turn 2, if turn 1 was C,C,C,C: history = [('C', 'C', 'C', 'C')]
    
    # Example: Always be a truthful cooperator.
    my_move = 'C'
    my_hint = 'C'
    
    return (my_move, my_hint)
`,
        cpp: `#include <iostream>
#include <string>
#include <vector>

// INSTRUCTIONS:
// Your output must be two characters to stdout: MOVE then HINT (e.g., "CD").
// The game history is passed as a single string in argv[1].
// Format: A series of 4-char blocks. e.g., for two turns: "CCCCDCDD".
// Each block is [YourMove][OpponentMove][YourHint][OpponentHint].
// You'll need to parse this string to inform your strategy.
int main(int argc, char* argv[]) {
    if (argc > 1) {
        std::string history = argv[1];
        // Example: check opponent's last actual move if history exists.
        if (history.length() >= 4) {
            char opponent_last_move = history[history.length() - 3];
            // if (opponent_last_move == 'D') { /* ... */ }
        }
    }
    
    // Example: Deceptive Defector (always hint C, play D)
    char my_move = 'D';
    char my_hint = 'C';
    
    std::cout << my_move << my_hint;
    return 0;
}
`,
        c: `#include <stdio.h>
#include <string.h>

// INSTRUCTIONS:
// Your output must be two characters to stdout: MOVE then HINT (e.g., "CC").
// The game history is passed as a single string in argv[1].
// Format: A series of 4-char blocks. e.g., for two turns: "CCCCDCDD".
// Each block is [YourMove][OpponentMove][YourHint][OpponentHint].
// You'll need to parse this string to inform your strategy.
int main(int argc, char* argv[]) {
    if (argc > 1) {
        char* history = argv[1];
        int len = strlen(history);
        if (len > 0) {
          // history is available to use
        }
    }

    // Example: Truthful Cooperator
    char my_move = 'C';
    char my_hint = 'C';

    printf("%c%c", my_move, my_hint);
    return 0;
}
`
    }
};

type ValidationStatus = 'idle' | 'validating' | 'success' | 'error';

const IDE: React.FC<IDEProps> = ({ submission, onSubmissionChange, round }) => {
    const [language, setLanguage] = useState<Language>(submission.language);
    const [code, setCode] = useState<string>(submission.code);
    const [output, setOutput] = useState<string[]>([]);
    const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');
    const currentPlaceholder = placeholderCode[round][language];

    useEffect(() => {
        setLanguage(submission.language);
        setCode(submission.code || currentPlaceholder);
        setValidationStatus('idle');
        setOutput([]);
    }, [submission, round, currentPlaceholder]);
    
    useEffect(() => {
        // If language changes and there was no prior code for that round, set placeholder
        if (!submission.code) {
           setCode(currentPlaceholder);
           setValidationStatus('idle');
           setOutput([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as Language;
        setLanguage(newLang);
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        if (validationStatus !== 'idle') {
            setValidationStatus('idle');
        }
    };
    
    const handleTestRun = () => {
        setValidationStatus('validating');
        setOutput(['Running validation...']);

        // Mock validation logic
        setTimeout(() => {
             if (round === 3) {
                // Round 3: Expects two characters
                const twoCharRegex = language === 'python' ? /return \('[CD]', '[CD]'\)|return \("[CD]", "[CD]"\)/ : /cout << "[CD][CD]"|printf\("[CD][CD]"\)|cout << [a-zA-Z_]+ << [a-zA-Z_]+|printf\("%c%c"*/;
                if (twoCharRegex.test(code)) {
                    setValidationStatus('success');
                    setOutput(prev => [...prev, "Validation successful. Detected valid dual output for Round 3."]);
                } else {
                    setValidationStatus('error');
                    setOutput(prev => [...prev, "ERROR: Invalid output for Round 3. Must output two characters (move and hint), e.g., ('C', 'D') in Python or \"CD\" in C++/C."]);
                }
            } else {
                // Round 1 & 2: Expects one character
                const cooperationRegex = language === 'python' ? /return 'C'|return "C"/ : /cout << "C"|printf\("C"\)/;
                const defectionRegex = language === 'python' ? /return 'D'|return "D"/ : /cout << "D"|printf\("D"\)/;
                
                if (cooperationRegex.test(code) || defectionRegex.test(code)) {
                     if (code.match(/return ('|")[^CD]('|")/) || code.match(/cout << "[^CD]"/)) {
                         setValidationStatus('error');
                         setOutput(prev => [...prev, "ERROR: Invalid output detected. Only 'C' or 'D' are allowed."]);
                    } else {
                        setValidationStatus('success');
                        const move = cooperationRegex.test(code) ? 'C' : 'D';
                        setOutput(prev => [...prev, `Validation successful. Mock output: '${move}'`]);
                    }
                } else {
                    setValidationStatus('error');
                    setOutput(prev => [...prev, "ERROR: Could not determine a valid output ('C' or 'D')."]);
                }
            }
        }, 1000);
    };

    const handleSubmit = () => {
        onSubmissionChange(language, code);
        alert(`Code for Round ${round} submitted!`);
    };
    
    const statusInfo = {
        idle: { icon: null, color: 'text-slate-400', text: 'Ready to submit.' },
        validating: { icon: null, color: 'text-yellow-400', text: 'Validating...' },
        success: { icon: <CheckCircleIcon className="w-5 h-5" />, color: 'text-green-400', text: 'Code is valid.' },
        error: { icon: <XCircleIcon className="w-5 h-5" />, color: 'text-red-400', text: 'Validation failed.' },
    };

    return (
        <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-slate-800 border-b border-slate-700">
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                </select>
                <div className="flex items-center gap-3">
                     <button 
                        onClick={handleTestRun}
                        disabled={validationStatus === 'validating'}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-bold text-sm rounded-md transition-colors disabled:opacity-50"
                    >
                        <PlayIcon className="w-4 h-4" />
                        Test Run
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-md transition-colors"
                    >
                        Save & Submit
                    </button>
                </div>
            </div>
            <textarea
                value={code}
                onChange={handleCodeChange}
                className="w-full h-80 bg-transparent text-slate-200 font-mono p-4 text-sm resize-none outline-none"
                spellCheck="false"
            />
            {(validationStatus !== 'idle' || output.length > 0) && (
                <div className="bg-black/50 p-4 border-t border-slate-700 font-mono text-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-300">Output</h4>
                         <div className={`flex items-center gap-2 text-xs ${statusInfo[validationStatus].color}`}>
                            {statusInfo[validationStatus].icon}
                            <span>{statusInfo[validationStatus].text}</span>
                        </div>
                    </div>
                    <div className="max-h-28 overflow-y-auto text-slate-400">
                        {output.map((line, i) => <p key={i} className="whitespace-pre-wrap">{`> ${line}`}</p>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IDE;