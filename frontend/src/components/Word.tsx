import { useEffect, useMemo, useState } from "react";
import Letter from "./Letter";
import { v4 as uuidv4 } from "uuid";

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos: any;
    onIsWordCorrectChange : (value : boolean) => void;
}

const Word = ({
    word,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
    setCurrentLetterPos,
    onIsWordCorrectChange
}: WordType) => {
    const [isWordCorrectC, setIsWordCorrectC] = useState<boolean | undefined>(undefined);
    const letterWithIds = useMemo(
        () => word.split("").map((letter) => ({ id: uuidv4(), letter })),
        [word]
    );

    useEffect(()=> {
        if(isWordCorrectC !== undefined){
            onIsWordCorrectChange(isWordCorrectC);
        }
    },[isWordCorrectC])

    return (
        <div key={wordIndex} className="h-14 flex items-center">
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
                    />
                ))}
        </div>
    );
};

export default Word;
