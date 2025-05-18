import { useEffect, useRef, useState } from "react";

import Words from "./components/Words";
import Timer from "./components/Timer";
import SpeedGraph from "./components/SpeedGraph";

import { LetterTrackingType, SpeedDataBySecondType} from "./types";

import "./app.css";

function App() {
    const [timer, setTimer] = useState<number>(15);
    const timerIntervalRef = useRef<number>(timer);
    const initialTimer = useRef<number>(15);
    const [timerStart, setTimerStart] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [speedDataBySecond, setSpeedDataBySecond] = useState<SpeedDataBySecondType[]>([]);
    const [letterTracker, setLetterTracker] = useState<LetterTrackingType[]>([]);
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
    if (timer === 0) {
        let wrongWordsIndexes = letterTracker.filter((item) => item.isCorrect === false).map(item => item.wordIndex);
        let lettersOfWrongWords = letterTracker.filter((item) => wrongWordsIndexes.includes(item.wordIndex));
        setTypingSpeed(
            ((letterTracker.length - lettersOfWrongWords.length) * (60 / initialTimer.current)) / 5
        );
        setTimer(-1);
    }
    //-----------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    //counting the speed every second
    useEffect(()=> {
        if(timer < initialTimer.current){
            let wrongWordsIndexes = letterTracker.filter((item) => item.isCorrect === false).map(item => item.wordIndex);
            let lettersOfWrongWords = letterTracker.filter((item) => wrongWordsIndexes.includes(item.wordIndex));
            if(timer === -1){
                setSpeedDataBySecond(curr => [...curr, {second: (initialTimer.current - timer - 1), wpm: Math.round( ((letterTracker.length - lettersOfWrongWords.length) * (60 / (initialTimer.current - timer - 1))) / 5 ) }])
            }
            else{
                setSpeedDataBySecond(curr => [...curr, {second: (initialTimer.current - timer), wpm: Math.round( ((letterTracker.length - lettersOfWrongWords.length) * (60 / (initialTimer.current - timer))) / 5 ) }])
            }
        }
    },[timer])
    //-------------------------------------------------------------------------------------------------------//

    return (
        <div className="bg-bgColor">
            {timer === -1 ? (
                <SpeedGraph typingSpeed={typingSpeed} speedDataBySecond={speedDataBySecond}/>
            ) : (
                <>
                    <Timer timer={timer} />
                    <Words
                        noOfWords={50}
                        setTimerStart={setTimerStart}
                        timer={timer}
                        setLetterTracker={setLetterTracker}
                    />
                </>
            )}
        </div>
    );
}

export default App;
