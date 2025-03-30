import { useState, useEffect, useRef } from 'react';

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex:number;
    currentWordIndex: number;
    currentLetterIndex: number
}

function Letter({ letter ,letterIndex, wordIndex, currentWordIndex, currentLetterIndex }: LetterType) {

    return (
        <div key={letterIndex} className='letter'>
            {letter && letter}
        </div>
    );
}

export default Letter;
