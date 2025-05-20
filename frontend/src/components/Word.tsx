import { useEffect, useMemo, useState } from "react";
import Letter from "./Letter";
import { v4 as uuidv4 } from "uuid";
import { LetterTrackingType } from "../types";

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos: any;
    onIsWordCorrectChange : (value : boolean) => void;
    setLetterTracker: React.Dispatch<React.SetStateAction<LetterTrackingType[]>>;
    letterTracker: LetterTrackingType[];
}

const Word = ({
    word,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
    setCurrentLetterPos,
    onIsWordCorrectChange,
    setLetterTracker,
    letterTracker
}: WordType) => {
    const [isWordCorrectC, setIsWordCorrectC] = useState<boolean | undefined>(undefined);
    const [wordStyle, setWordStyle] = useState<string>('h-14 flex items-center');
    const letterWithIds = useMemo(
        () => word.split("").map((letter) => ({ id: uuidv4(), letter })),
        [word]
    );
    
    //it passes the isWordCorrect to it's parent (words comp)
    useEffect(()=> {
        if(isWordCorrectC !== undefined){
            onIsWordCorrectChange(isWordCorrectC);
        }
    },[isWordCorrectC])


    useEffect(()=> {
        if(currentLetterIndex === 0 && currentWordIndex - 1 === wordIndex)    
        {
            let currectWord = letterTracker.filter((item) => item.wordIndex === currentWordIndex - 1).map((item) => item.isCorrect);

            if(currectWord.includes(false) && currentWordIndex - 1 === wordIndex){
                setWordStyle('h-14 flex items-center underline underline-offset-8 decoration-3 decoration-wrongTxt');
            }

        }
    },[letterTracker])

    return (
        <div key={wordIndex} className={wordStyle}>
            {word &&
                letterWithIds.map((letter, index) => (
                    <Letter
                        key={letter.id}
                        letter={letter.letter}
                        letterIndex={index}
                        wordIndex={wordIndex}
                        currentWordIndex={currentWordIndex}
                        currentLetterIndex={currentLetterIndex}
                        typedLetter={typedLetter}
                        setCurrentLetterPos={setCurrentLetterPos}
                        wordLength={word.length}
                        setIsWordCorrectC={setIsWordCorrectC}
                        setLetterTracker={setLetterTracker}
                    />
                ))}
        </div>
    );
};

export default Word;
