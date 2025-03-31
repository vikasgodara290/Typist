import { useState, useEffect, useRef } from 'react';

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex:number;
    currentWordIndex: number;
    currentLetterIndex: number;
    isCorrect: boolean|null
}

function Letter({ letter ,letterIndex, wordIndex, currentWordIndex, currentLetterIndex, isCorrect }: LetterType) {
    console.log(isCorrect+ ' '+ currentWordIndex + ' '+currentLetterIndex+ ' ');
    let textColor = 'text-red-400';
    
    return (
        <div key={letterIndex} className={`${currentWordIndex === wordIndex && letterIndex === currentWordIndex && isCorrect===false && textColor}`}>
            {letter && letter}
        </div>
    );
}

export default Letter;
