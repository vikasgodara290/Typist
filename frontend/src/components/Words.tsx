import { useEffect, useRef, useState } from "react";
import english10k from "../assets/english_10k.json";
import Word from "./Word";

interface WordsType {
    noOfWords: number;
}

const Words = ({ noOfWords }: WordsType) => {
    const [words, setWords] = useState<string[]>([]);
    const wordDivRef = useRef<HTMLDivElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(-1);
    //const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [typedLetter, setTypedLetter] = useState<string>("");

    //What is difference between mount and re-render?
    /*
        Mount : Very first time created and inserted into DOM.
            -> On Reload (initial Render), Route change 
        Re-Render : Component is already inserted, there is change in state init that's why it re-render with new state.
    */
    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 10000);
            wordsTemp.push(english10k.words[randomIndex]);
        }
        setWords(wordsTemp);

        //This is clean up code on unmounting the Words component
        return;
    }, [noOfWords]);

    function onKeyUpHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == " ") {
            setCurrentLetterIndex(0);
            setCurrentWordIndex(currentWordIndex + 1);
            return;
        }
        
        // if (e.key !== words[currentWordIndex].charAt(currentLetterIndex)) {
        //     setIsCorrect(false);
        // } else {
        //     setIsCorrect(true);
        // }

        setTypedLetter(e.key);

        if (words[currentWordIndex].length > currentLetterIndex) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        }
    }

    document.addEventListener("keyup", () => {
        wordDivRef.current?.focus();
    });

    return (
        <div className="flex items-center h-screen">
            <div
                id="wordsDiv"
                tabIndex={1}
                ref={wordDivRef}
                onKeyUp={onKeyUpHandler}
            >
                <div
                    id="outOfFocusWarning"
                    className="absolute flex justify-center items-center w-11/12 h-42 text-2xl"
                >
                    Click here or press any key to focus
                </div>
                <div
                    id="words"
                    className="relative flex w-11/12 mx-auto h-42 flex-wrap text-4xl text-gray-500 overflow-hidden blur-[5px]"
                >
                    {/*Using indexes as keys are not a good way to build
                    Use either id of word from db
                    or UUID*/}
                    {words &&
                        words.map((word, index) => (
                            <Word
                                key={index}
                                word={word}
                                wordIndex={index}
                                currentWordIndex={currentWordIndex}
                                currentLetterIndex={currentLetterIndex}
                                typedLetter={typedLetter}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Words;
