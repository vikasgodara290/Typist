import { useEffect, useRef, useState } from "react";
import english10k from "../assets/english_10k.json";
import Word from "./Word";

interface WordsType {
    noOfWords: number;
}

const Words = ({ noOfWords }: WordsType) => {
    const [words, setWords] = useState<string[]>([]);
    const wordsDivRef = useRef<HTMLDivElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
    const [typedLetter, setTypedLetter] = useState<string>("");
    const [carrotMargin, setCarrotMargin] = useState<number>(72);
    const [currentLetterPos, setCurrentLetterPos] = useState<{x : number, y : number}>({x: 72, y: 328})
    
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
            let randomIndex = Math.floor(Math.random() * 10000);
            wordsTemp.push(english10k.words[randomIndex]);
        }
        setWords(wordsTemp);

        //This is clean up code on unmounting the Words component
        return;
    }, [noOfWords]);
//-------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------//
    function onKeyUpHandler(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == " ") {
            setCurrentLetterIndex(0);
            setCurrentWordIndex((curr) => 
                {
                    setCarrotMargin(currm => currm + 22)
                    return curr + 1
                });
            
            return;
        }

        if (e.key == "Shift") {
            return;
        }

        if (e.key === "Backspace") {
            if (currentLetterIndex > 0) {
                setCurrentLetterIndex((curr) => {
                    setCarrotMargin(currm => currm - 22)
                    return curr - 1
                });
                
            } else {
                if (currentWordIndex > 0) {
                    // setCurrentWordIndex(curr => curr - 1)
                    // setCurrentLetterIndex(words[currentWordIndex - 1].length - 1 )
                    setCurrentWordIndex((curr) => {
                        const newWordIndex = curr - 1;
                        setCurrentLetterIndex(words[newWordIndex].length);
                        setCarrotMargin(currm => currm - 22)
                        return newWordIndex;
                    });
                    
                }
            }
            setTypedLetter(e.key);
            return;
        }
        setCarrotMargin(curr => curr + 11)
        setTypedLetter(e.key);

        if (words[currentWordIndex].length > currentLetterIndex) {
            setCurrentLetterIndex(curr => {
                setCarrotMargin(currm => currm + 11)
                return curr + 1
            });
        }
    }
//-------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------//
    document.addEventListener("keyup", () => {
        wordsDivRef.current?.focus();
    });
//-------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------//
/*Detect that carrot is on end of 2nd line and user pressed space*/
// if(wordsDivRef.current){
//     const containerTop = wordsDivRef.current!.getBoundingClientRect().top;
//     console.log(containerTop);
// }

// if(wordSpanRef.current){
//     console.log(wordSpanRef.current);
//     const wordtp = wordSpanRef.current!.getBoundingClientRect().top
//     console.log("word" ,wordtp);
    
// }

//-------------------------------------------------------------------------------------------------------//

    return (
        <div className=" h-screen">
            <div
                id="wordsDiv"
                tabIndex={1}
                ref={wordsDivRef}
                onKeyUp={onKeyUpHandler}
                className="outline-none fixed h-42 mt-80"
            >
                <div
                    id="outOfFocusWarning"
                    className="absolute flex justify-center items-center w-11/12 h-42 text-2xl"
                >
                    Click here or press any key to focus
                </div>
                <div id="carrot" className={`absolute w-1 h-10 bg-amber-500 rounded-2xl`}
                style={{ marginLeft: currentLetterPos.x, marginTop: currentLetterPos.y - 320} }>

                </div>
                <div
                    id="words"
                    className="flex w-11/12 mx-18 h-42 flex-wrap text-4xl text-gray-500 overflow-hidden blur-[5px]"
                >
                    {/*Using indexes as keys are not a good way to build
                    Use either id of word from db
                    or UUID*/}
                    {words &&
                        words.map((word, index) => (
                            word && <Word
                                key={index}
                                word={word.trim()}
                                wordIndex={index}
                                currentWordIndex={currentWordIndex}
                                currentLetterIndex={currentLetterIndex}
                                typedLetter={typedLetter}
                                setCurrentLetterPos = {setCurrentLetterPos}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Words;
