import { useEffect, useState } from "react";

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
    const [carrot, setCarrot] = useState<string>("border-r-3 border-white");

    useEffect(() => {
        //console.log(typedLetter, letter, letterIndex , currentLetterIndex - 1, wordIndex , currentWordIndex);
    
        if(typedLetter === "Backspace"){
            console.log(typedLetter, currentLetterIndex, letter);
            if(letterIndex === currentLetterIndex - 1 && wordIndex === currentWordIndex){
                console.log(letter);

                setCarrot("border-r-3 border-amber-500")
            }
            if(letterIndex === currentLetterIndex && wordIndex === currentWordIndex){
                setletterColor("text-gray-500");
                setCarrot("border-r-3 border-white")
            }
            return;
        }
        if (typedLetter !== "" && ( letterIndex === currentLetterIndex - 1 ) && wordIndex === currentWordIndex) {
            setCarrot("border-r-3 border-amber-500")
            if (typedLetter !== letter) {
                setletterColor("text-red-300");
            } else {
                setletterColor("text-black");
            }
        }
        else{
            setCarrot("border-r-3 border-white")
        }
    }, [currentLetterIndex, currentWordIndex]);

    return (
        <div key={letterIndex} className={`${letterColor} ${carrot}`}>
            {letter && letter}
        </div>
    );
};

export default Letter;
