import { useState, useEffect, useRef } from 'react';

interface LetterType {
    letter: string;
    letterIndex: number;
    wordIndex:number;
    words:string[];
}

function Letter({ letter ,letterIndex, wordIndex, words}: LetterType) {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const letterRef = useRef<any>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    // useEffect(()=>{
    //     if(letterIndex ===0 && wordIndex === 0)
    // },[])

    function onKeyUpHandler(event: any, index: number) {
        if (!words[currentWordIndex]) return;
console.log(index);

        const letter = event.key;
        const expectedLetter = letterRef.current?.innerHTML;
        console.log(letter + ' ' + expectedLetter);

        if (letter === expectedLetter) {
            if (currentLetterIndex + 1 < words[currentWordIndex].length) {
                setCurrentLetterIndex((prev) => prev + 1);
            } else {
                setCurrentWordIndex((prev) => prev + 1);
                setCurrentLetterIndex(0);
            }
        }

        console.log(currentWordIndex + ' ' + currentLetterIndex);
        
    }

    return (
        <div
            key={letterIndex}
            className=''
            tabIndex={0} 
            ref={letterRef} 
            onKeyUp={(e : any, index: number)=>onKeyUpHandler(e, index)}
        >
            {letter}
        </div>
    );
}

export default Letter;
