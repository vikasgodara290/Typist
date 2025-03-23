import React from 'react';
import Letter from './Letter';

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
}

const Word = React.memo(({ word, wordIndex, currentWordIndex, currentLetterIndex }: WordType) => {
    return (
        <div className='mr-5 h-14 flex items-center'>
            {word.split('').map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    letterIndex={index}
                    isActive={wordIndex === currentWordIndex && index === currentLetterIndex}
                />
            ))}
        </div>
    );
});

export default Word;
