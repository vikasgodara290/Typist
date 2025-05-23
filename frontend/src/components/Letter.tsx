import { useEffect, useRef, useState } from "react";
import { LetterTrackingType } from "../types";

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos: any;
    wordLength: number;
    setIsWordCorrectC: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >;
    setLetterTracker: React.Dispatch<
        React.SetStateAction<LetterTrackingType[]>
    >;    
    setTotalIncorrectLetter: React.Dispatch<React.SetStateAction<number>>;
}

const Letter = ({
    letter,
    letterIndex,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
    setCurrentLetterPos,
    wordLength,
    setIsWordCorrectC,
    setLetterTracker,
    setTotalIncorrectLetter
}: LetterType) => {
    const [letterColor, setletterColor] = useState<string>("text-txtColor");
    const letterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //user typied backspace
        if (typedLetter === "Backspace") {
            //get the the letter which need to be removed
            if (
                letterIndex === currentLetterIndex &&
                wordIndex === currentWordIndex
            ) {
                //set the default color
                setletterColor("text-txtColor");
                setLetterTracker((curr) => {
                    const updatedCurr = curr.filter((item) =>
                        !(item.wordIndex === wordIndex &&
                        item.letterIndex === letterIndex)
                    );
                    return updatedCurr;
                });
                //set the caret to current letter's left
                const x = letterRef.current?.getBoundingClientRect().x;
                const y = letterRef.current?.getBoundingClientRect().y;
                setCurrentLetterPos({ x: x, y: y });
                //make the word isCorrect undefined
                if (currentLetterIndex != wordLength - 1) {
                    setIsWordCorrectC(undefined);
                }
            }
            return;
        }

        //user typed a letter
        if (
            typedLetter !== "" &&
            letterIndex === currentLetterIndex - 1 &&
            wordIndex === currentWordIndex
        ) {
            //if check the typed letter is correct or not and set color accordingly
            if (typedLetter !== letter) {
                setletterColor("text-wrongTxt");
                setTotalIncorrectLetter(curr => curr + 1)
                //set the entire word to wrong
                setLetterTracker((curr) => [
                    ...curr,
                    {
                        wordIndex: wordIndex,
                        letterIndex: letterIndex,
                        isCorrect: false,
                    },
                ]);
                setIsWordCorrectC(false);
            } else {
                setletterColor("text-correctTxt");
                setLetterTracker((curr) => [
                    ...curr,
                    {
                        wordIndex: wordIndex,
                        letterIndex: letterIndex,
                        isCorrect: true,
                    },
                ]);
                //set the entire word to right if it does not have any wrong letter
                setIsWordCorrectC((curr) => {
                    if (curr === true || curr === undefined) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }

        //it moves the caret to next letter
        if (
            typedLetter !== "" &&
            letterIndex === currentLetterIndex &&
            wordIndex === currentWordIndex
        ) {
            const x = letterRef.current?.getBoundingClientRect().x;
            const y = letterRef.current?.getBoundingClientRect().y;
            setCurrentLetterPos({ x: x, y: y });
        }
    }, [currentLetterIndex, currentWordIndex, typedLetter]);

    return (
        <div
            className={`${letterColor} w-5.5 h-14 roboto-mono-400 p-0 m-0`}
            ref={letterRef}
        >
            {letter && letter}
        </div>
    );
};

export default Letter;
