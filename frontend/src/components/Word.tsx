import { useMemo } from "react";
import Letter from "./Letter";
import { v4 as uuidv4 } from "uuid";

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos: any;
}

const Word = ({
    word,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
    setCurrentLetterPos,
}: WordType) => {
    const letterWithIds = useMemo(
        () => word.split("").map((letter) => ({ id: uuidv4(), letter })),
        [word]
    );

    return (
        <div key={wordIndex} className="mr-5.5 h-14 flex items-center">
            {word &&
                letterWithIds
                    .map((letter, index) => (
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
                        />
                    ))}
        </div>
    );
};

export default Word;
