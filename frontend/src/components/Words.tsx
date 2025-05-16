import { useEffect, useMemo, useRef, useState } from "react";
import english1k from "../assets/english_1k.json";
import Word from "./Word";
import { v4 as uuidv4 } from "uuid";

interface WordsType {
    noOfWords: number;
    setTimerStart: React.Dispatch<React.SetStateAction<boolean>>;
    timer: number;
}

const Words = ({ noOfWords, setTimerStart, timer }: WordsType) => {
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
    //-------------------------------------------------------------------------------------------------------//
    //What is difference between mount and re-render?
    /*
        Mount : Very first time created and inserted into DOM.
            -> On Reload (initial Render), Route change 
        Re-Render : Component is already inserted, there is change in state init that's why it re-render with new state.
    */
    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 1000);
            wordsTemp.push(english1k.words[randomIndex]);
        }
        setWords(wordsTemp);

        //This is clean up code on unmounting the Words component
        //return console.log("hi there");
    }, [noOfWords]);
    //-------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------//
    function onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        if (timer === 0) return;
        if (e.key == " ") {
            setCurrentLetterIndex(0);
            setCurrentWordIndex((curr) => curr + 1);
            return;
        }

        if (e.key.length !== 1 && e.key != "Backspace") return;

        //if (!/^[\u0020-\u007E]$/.test(e.key)) return;

        if (e.key == "Shift") {
            return;
        }

        if (e.key === "Backspace") {
            if (currentLetterIndex > 0) {
                setCurrentLetterIndex((curr) => curr - 1);
                console.log("i ma here");
            } else {
                if (currentWordIndex > 0) {
                    // setCurrentWordIndex(curr => curr - 1)
                    // setCurrentLetterIndex(words[currentWordIndex - 1].length - 1 )
                    setCurrentWordIndex((curr) => {
                        const newWordIndex = curr - 1;
                        setCurrentLetterIndex(words[newWordIndex].length - 1);
                        return newWordIndex;
                    });
                }
            }
            setTypedLetter(e.key);
            return;
        }

        setTypedLetter(e.key);

        if (words[currentWordIndex].length > currentLetterIndex) {
            setCurrentLetterIndex((curr) => curr + 1);
        }
    }
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//

    useEffect(() => {
        document.addEventListener("keyup", () => {
            setTimerStart(true);
            wordsDivRef.current?.focus();
        });
    }, []);
    //-------------------------------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    /*Detect that carrot is on end of 2nd line and user pressed space*/
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

    const wordsWithIds = useMemo(
        () => words.map((word) => ({ id: uuidv4(), word })),
        [words]
    );
    //-------------------------------------------------------------------------------------------------------//
    /*
        cmd + <- | -> move to start and end of line
        cmd + shift +<- | -> move to start and end of line and select
        cmd + backspace to remove one line 
        option + <- | -> move one word 
        option + up or down arrow key to move the line up or down 
        option + shift + <- | -> move one word and select
        option + shift + down or up arrow key to duplicate the line up or down
        option + backspace to remove one word 
        cmd + x to delete one line and copy it to clipboard
        option + right click to have double cursor for writing 
    */


    useEffect(()=> {
        //console.log(currentWordIndex);
        
    },[currentWordIndex])
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
                                        />
                                    )
                            )}
                </div>
            </div>
        </div>
    );
};

export default Words;
