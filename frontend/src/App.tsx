import { useEffect, useRef, useState } from "react";

import Words from "./components/Words";
import Timer from "./components/Timer";
import SpeedGraph from "./components/SpeedGraph";

import { LetterTrackingType, SpeedDataBySecondType } from "./types";

import "./app.css";
import ToolBar from "./components/ToolBar";

function App() {
    const initialTimer = useRef<number>(15);
    const [timer, setTimer] = useState<number>(15);
    const timerIntervalRef = useRef<number>(timer);
    const [timerStart, setTimerStart] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [speedDataBySecond, setSpeedDataBySecond] = useState<
        SpeedDataBySecondType[]
    >([]);
    const [letterTracker, setLetterTracker] = useState<LetterTrackingType[]>(
        []
    );
    const [totalIncorrectLetterP, setTotalIncorrectLetterP] =
        useState<number>(0);
    //-----------------------------------------------------------------------------//
    //it starts the timer when user hit a key. it sets the setTimerStart in words comp.
    useEffect(() => {
        if (timerStart) {
            timerIntervalRef.current = setInterval(() => {
                setTimer((curr) => curr - 1);
            }, 1000);
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [timerStart]);
    //-----------------------------------------------------------------------------//

    //-----------------------------------------------------------------------------//
    //it clears the setInterval on -1
    if (timer === -1 && timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
    //calculate the typing speed on timer 0
    useEffect(() => {
        if (timer === 0) {
            let wrongWordsIndexes = letterTracker
                .filter((item) => item.isCorrect === false)
                .map((item) => item.wordIndex);
            let lettersOfWrongWords = letterTracker.filter((item) =>
                wrongWordsIndexes.includes(item.wordIndex)
            );
            setTypingSpeed(
                ((letterTracker.length - lettersOfWrongWords.length) *
                    (60 / initialTimer.current)) /
                    5
            );
        }
    }, [timer]);
    //-----------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    //counting the speed every second
    useEffect(() => {
        if (timer < initialTimer.current) {
            let wrongWordsIndexes = letterTracker
                .filter((item) => item.isCorrect === false)
                .map((item) => item.wordIndex);
            let lettersOfWrongWords = letterTracker.filter((item) =>
                wrongWordsIndexes.includes(item.wordIndex)
            );
            if (timer > -1) {
                setSpeedDataBySecond((curr) => [
                    ...curr,
                    {
                        second: initialTimer.current - timer,
                        wpm: Math.round(
                            ((letterTracker.length -
                                lettersOfWrongWords.length) *
                                (60 / (initialTimer.current - timer))) /
                                5
                        ),
                    },
                ]);
            }
        }
    }, [timer]);
    //-------------------------------------------------------------------------------------------------------//

    return (
        <div className="bg-bgColor">
            {timer < 1 ? (
                <SpeedGraph
                    typingSpeed={typingSpeed}
                    speedDataBySecond={speedDataBySecond}
                    time={initialTimer.current}
                    letterTracker={letterTracker}
                    totalIncorrectLetterP={totalIncorrectLetterP}
                />
            ) : (
                <>
                    <div className="absolute mt-40 mx-auto left-0 right-0 top-0 bottom-0 w-[300px] h-10">
                        <ToolBar setTimer={setTimer} initialTimer={initialTimer}/>
                    </div>
                    <Timer timer={timer} />
                    <Words
                        noOfWords={50}
                        setTimerStart={setTimerStart}
                        timer={timer}
                        setTimer={setTimer}
                        initialTimer={initialTimer.current}
                        setLetterTracker={setLetterTracker}
                        letterTracker={letterTracker}
                        setTotalIncorrectLetter={setTotalIncorrectLetterP}
                        setSpeedDataBySecond={setSpeedDataBySecond}
                    />
                </>
            )}
        </div>
    );
}

export default App;
