import { useEffect, useMemo, useRef, useState } from "react";
import english1k from "../assets/english_1k.json";
import Word from "./Word";
import { v4 as uuidv4 } from "uuid";
import SpeedDataBySecondType from "../types";

interface WordsType {
    noOfWords: number;
    setTimerStart: React.Dispatch<React.SetStateAction<boolean>>;
    timer: number;
    setTotalCorrectLetterTyped: React.Dispatch<React.SetStateAction<number>>;
    setSpeedDataBySecond: React.Dispatch<
        React.SetStateAction<SpeedDataBySecondType[]>
    >;
}

const Words = ({
    noOfWords,
    setTimerStart,
    timer,
    setTotalCorrectLetterTyped,
    setSpeedDataBySecond,
}: WordsType) => {
    const [words, setWords] = useState<string[]>([]);
    const wordsDivRef = useRef<HTMLDivElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
    const [typedLetter, setTypedLetter] = useState<string>("");
    const [currentLetterPos, setCurrentLetterPos] = useState<{
        x: number;
        y: number;
    }>({ x: 72, y: 320 });
    const [wordsRemoved, setWordsRemoved] = useState<number>(0);
    const [wordsInFirstLine, setWordsnFirstLine] = useState<number>(0);
    const [isWordCorrectP, setIsWordCorrectP] = useState<boolean | undefined>();

    //-------------------------------------------------------------------------------------------------------//
    // set a array of words based on no of words required
    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 1000);
            wordsTemp.push(english1k.words[randomIndex]);
        }
        setWords(wordsTemp);
    }, [noOfWords]);
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    // it capture all the keys pressed by user
    function onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        //if timer hits 0. it disable the key down event for user to stop writing.
        if (timer === 0) return;

        //if user is at last char of word(space always) and it types any key other than backspace.
        if (
            currentLetterIndex === words[currentWordIndex].length - 1 &&
            e.key != "Backspace"
        ) {
            //if user types space which is correct moves to next word and it counts as a correctly typed letter if word is correctly typed.
            //else it diable user to move forward to next word until it presses space.
            if (e.key == " ") {
                setCurrentLetterIndex(0);
                setCurrentWordIndex((curr) => curr + 1);
                if (isWordCorrectP) {
                    setTotalCorrectLetterTyped((curr) => curr + 1);
                }
                return;
            } else {
                return;
            }
        }

        //if user press space in between a word, it moves to next word and also it set the word as incorrectly typed.
        if (e.key == " ") {
            setCurrentLetterIndex((curr) => {
                if (curr !== words[currentWordIndex].length - 1) {
                    setIsWordCorrectP(false);
                }
                return 0;
            });
            setCurrentWordIndex((curr) => curr + 1);
            return;
        }

        //it ignores the non related keys like alt, tab, f1-f9, esc etc.
        if (e.key.length !== 1 && e.key != "Backspace") return;

        if (e.key === "Backspace") {
            
            //if user is at last letter of word (space always) and hit backspace user should not be able to go back to word
            if (
                currentLetterIndex === words[currentWordIndex].length - 1 &&
                isWordCorrectP
            ){
                return;
            }
            
            //if user is not on first word and is not 0 index of another word it will remove space and -1 the correct letter count
            if (currentLetterIndex === 0 && currentWordIndex != 0) {
                setTotalCorrectLetterTyped((curr) => curr - 1);
                setCurrentWordIndex((curr) => {
                    const newWordIndex = curr - 1;
                    setCurrentLetterIndex(words[newWordIndex].length - 1);
                    return newWordIndex;
                });
            }

            //if user in between a word and hit backspace go to prev letter
            if (currentLetterIndex > 0) {
                setCurrentLetterIndex((curr) => curr - 1);
            }

            //set the typed letter (Backspace)
            setTypedLetter(e.key);
            return;
        }

        //if it is a normal char and passes all he above conditions
        setTypedLetter(e.key);
        
        //move to next letter
        if (words[currentWordIndex].length > currentLetterIndex) {
            setCurrentLetterIndex((curr) => curr + 1);
        }
    }
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    //when ever user hit any key it set the timer to start and focus on the words div
    useEffect(() => {
        document.addEventListener("keyup", () => {
            setTimerStart(true);
            wordsDivRef.current?.focus();
        });
    }, []);
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    //Detect that carrot is on end of 2nd line and user pressed space
    useEffect(() => {
        const { x, y } = currentLetterPos;

        if (x === 72 && y === 376) {
            setWordsnFirstLine(currentWordIndex);
            return;
        }

        if (x === 72 && y === 432) {
            setWordsRemoved(wordsInFirstLine);
            setCurrentLetterPos((curr) => ({ x: curr.x, y: curr.y - 56 }));
        }
    }, [currentLetterPos]);
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    // setting up UUID to words
    const wordsWithIds = useMemo(
        () => words.map((word) => ({ id: uuidv4(), word })),
        [words]
    );
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    // set the word is correct or wrong by word comp
    const onIsWordCorrectChange = (value: boolean) => {
        setIsWordCorrectP(value);
    };
    //-------------------------------------------------------------------------------------------------------//

    return (
        <div className=" h-screen">
            <div
                id="wordsDiv"
                tabIndex={1}
                ref={wordsDivRef}
                onKeyDown={(e) => onKeyDownHandler(e)}
                className="outline-none fixed h-42 mt-80"
            >
                <div
                    id="outOfFocusWarning"
                    className="absolute flex justify-center items-center w-11/12 h-42 text-2xl text-correctTxt"
                >
                    Click here or press any key to focus
                </div>
                <div
                    id="carrot"
                    className={`absolute w-1 h-10 bg-amber-500 rounded-2xl duration-200`}
                    style={{
                        transform: `translate(${currentLetterPos.x}px, ${
                            currentLetterPos.y - 320
                        }px)`,
                    }}
                ></div>
                <div
                    id="words"
                    className="flex w-11/12 mx-18 h-42 flex-wrap text-4xl overflow-hidden blur-[5px]"
                >
                    {/*Using indexes as keys are not a good way to build
                    Use either id of word from db
                    or UUID*/}
                    {wordsWithIds &&
                        wordsWithIds
                            .slice(wordsRemoved, words.length)
                            .map(
                                (wordObj, index) =>
                                    wordObj.word && (
                                        <Word
                                            key={wordObj.id}
                                            word={wordObj.word}
                                            wordIndex={index + wordsRemoved}
                                            currentWordIndex={currentWordIndex}
                                            currentLetterIndex={
                                                currentLetterIndex
                                            }
                                            typedLetter={typedLetter}
                                            setCurrentLetterPos={
                                                setCurrentLetterPos
                                            }
                                            onIsWordCorrectChange={
                                                onIsWordCorrectChange
                                            }
                                            setTotalCorrectLetterTyped={
                                                setTotalCorrectLetterTyped
                                            }
                                        />
                                    )
                            )}
                </div>
            </div>
        </div>
    );
};

export default Words;
