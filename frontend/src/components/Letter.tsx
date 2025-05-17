import { useEffect, useRef, useState } from "react";

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos: any;
    wordLength: number;
    setIsWordCorrectC : React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
}: LetterType) => {
    const [letterColor, setletterColor] = useState<string>("text-txtColor");
    const letterRef = useRef<HTMLDivElement>(null);
    const [isTypedLetter, setIsTypedLetter] = useState<{isTyped: boolean, isCorrect: boolean | undefined}>({isTyped: false, isCorrect: undefined})
    
    useEffect(() => {
        if (typedLetter === "Backspace") {
            //console.log(typedLetter, currentLetterIndex, letter);
            if (
                letterIndex === currentLetterIndex - 1 &&
                wordIndex === currentWordIndex
            ) {
                //console.log(letter);
                //setCarrot("border-r-3 border-amber-500")
            }
            if (
                letterIndex === currentLetterIndex &&
                wordIndex === currentWordIndex
            ) {
                setletterColor("text-txtColor");
                //setCarrot("border-r-3 border-white")
                const x = letterRef.current?.getBoundingClientRect().x;
                const y = letterRef.current?.getBoundingClientRect().y;
                setCurrentLetterPos({ x: x, y: y });
                setIsTypedLetter({isTyped : false, isCorrect: undefined});
                if(currentLetterIndex != wordLength - 1){
                    setIsWordCorrectC(undefined);
                }
                
            }
            return;
        }
        if (
            typedLetter !== "" &&
            letterIndex === currentLetterIndex - 1 &&
            wordIndex === currentWordIndex
        ) {
            //setCarrot("border-r-3 border-amber-500")

            if (typedLetter !== letter) {
                setletterColor("text-wrongTxt");
                setIsTypedLetter({isTyped : true, isCorrect: false});             
                setIsWordCorrectC(false);
            } else {
                setletterColor("text-correctTxt");
                setIsTypedLetter({isTyped : true, isCorrect: true});
                setIsWordCorrectC(curr => {
                    if(curr === true || curr === undefined){
                        return true;
                    }
                    else{
                        return false;
                    } 
                }); 
            }
        }
        if (
            typedLetter !== "" &&
            letterIndex === currentLetterIndex &&
            wordIndex === currentWordIndex
        ) {
            //setCarrot("border-r-3 border-amber-500")
            //letterRef.current?.focus()
            // console.log(typedLetter, letter, letterIndex , currentLetterIndex, wordIndex , currentWordIndex);
            // console.log(letterRef.current?.getBoundingClientRect());
            const x = letterRef.current?.getBoundingClientRect().x;
            const y = letterRef.current?.getBoundingClientRect().y;
            setCurrentLetterPos({ x: x, y: y });
        }
        if (
            typedLetter !== "" &&
            letterIndex === currentLetterIndex - 1 &&
            currentLetterIndex === wordLength &&
            wordIndex === currentWordIndex
        ) {
            //setCarrot("border-r-3 border-amber-500")
            //letterRef.current?.focus()
            // console.log(typedLetter, letter, letterIndex , currentLetterIndex, wordIndex , currentWordIndex, wordLength);
            // console.log(letterRef.current?.getBoundingClientRect());
            setCurrentLetterPos((curr: { x: number; y: number }) => {
                return { x: curr.x + 22, y: curr.y };
            });
        } else {
            //setCarrot("border-r-3 border-white")
        }
        
    }, [currentLetterIndex, currentWordIndex, typedLetter]);

    return (
        <div
            className={`${letterColor} w-5.5 h-14 roboto-mono-400`}
            ref={letterRef}
        >
            {letter && letter}
        </div>
    );
};

export default Letter;
