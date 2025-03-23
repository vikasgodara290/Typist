import React, { useState, useEffect } from 'react';

interface LetterType {
    letter: string;
    letterIndex: number;
    isActive: boolean;
}

const Letter = React.memo(({ letter, isActive }: LetterType) => {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        if (!isActive) return;

        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === letter) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }
        }

        window.addEventListener('keyup', handleKeyPress);
        return () => window.removeEventListener('keyup', handleKeyPress);
    }, [isActive, letter]);

    return (
        <div
            className={`letter cursor-default px-1 ${
                isActive ? 'bg-blue-300 text-black' : 'text-gray-500'
            } ${isCorrect === true ? 'text-green-500' : isCorrect === false ? 'text-red-500' : ''}`}
        >
            {letter}
        </div>
    );
});

export default Letter;
