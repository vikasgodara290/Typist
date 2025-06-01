import { useEffect, useRef, useState } from "react";

import Words from "./components/Words";
import Timer from "./components/Timer";
import SpeedGraph from "./components/SpeedGraph";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";

import { LetterTrackingType, SpeedDataBySecondType } from "./types";

import "./app.css";
import ToolBar from "./components/ToolBar";

function App() {
    const [userSelectedTime, setUserSelectedTime] = useState<number>( Number (localStorage.getItem("time")) || 30);
    const [timer, setTimer] = useState<number>(Number (localStorage.getItem("time"))  || 30);
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
                    (60 / userSelectedTime)) /
                    5
            );
        }
    }, [timer]);
    //-----------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------------------------//
    //counting the speed every second
    useEffect(() => {
        if (timer < userSelectedTime) {
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
                        second: userSelectedTime - timer,
                        wpm: Math.round(
                            ((letterTracker.length -
                                lettersOfWrongWords.length) *
                                (60 / (userSelectedTime - timer))) /
                                5
                        ),
                    },
                ]);
            }
        }
    }, [timer]);
    //-------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------------------------------------------------------------//
    useEffect(() => {
        setTimer(userSelectedTime);
        localStorage.setItem("time", userSelectedTime.toString());
    },[userSelectedTime])
    //-------------------------------------------------------------------------------------------------------//

    return (
        <div className="bg-bgColor h-screen">
            <header className="absolute inset-0 flex justify-between h-24 items-center roboto-mono-400 mx-[72px]">
                <div className="text-4xl text-correctTxt">Typist</div>
                <div className="text-txtColor flex items-center hover:cursor-pointer">
                    {/* <span className="mx-2"><CgProfile/></span> */}
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            {timer < 1 ? (
                <SpeedGraph
                    typingSpeed={typingSpeed}
                    speedDataBySecond={speedDataBySecond}
                    time={userSelectedTime}
                    letterTracker={letterTracker}
                    totalIncorrectLetterP={totalIncorrectLetterP}
                />
            ) : (
                <>
                    <div className="absolute mt-40 mx-auto inset-0 w-[300px] h-10">
                        <ToolBar
                            userSelectedTime={userSelectedTime}
                            setUserSelectedTime={setUserSelectedTime}
                        />
                    </div>
                    <Timer timer={timer} />
                    <Words
                        noOfWords={150}
                        setTimerStart={setTimerStart}
                        timer={timer}
                        setTimer={setTimer}
                        userSelectedTime={userSelectedTime}
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
