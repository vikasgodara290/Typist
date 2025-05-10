import { useEffect, useRef, useState } from "react";

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
}

const Letter = ({
    letter,
    letterIndex,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
}: LetterType) => {
    const [letterColor, setletterColor] = useState<string>("");

    useEffect(() => {
        //console.log(typedLetter, letter, letterIndex , currentLetterIndex - 1, wordIndex , currentWordIndex);
        
        if (typedLetter !== "" && ( letterIndex === currentLetterIndex) && wordIndex === currentWordIndex) {
            if (typedLetter !== letter) {
                setletterColor("text-red-300");
            } else {
                setletterColor("text-black");
            }
        }
    }, [currentLetterIndex, currentWordIndex]);

    return (
        <div key={letterIndex} className={`${letterColor}`}>
            {letter && letter}
        </div>
    );
};

export default Letter;
