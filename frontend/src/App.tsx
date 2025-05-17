import Words from "./components/Words";
import "./app.css";
import Timer from "./components/Timer";
import { useEffect, useRef, useState } from "react";
import SpeedGraph from "./components/SpeedGraph";

function App() {
    const [timer, setTimer] = useState<number>(15);
    const timerIntervalRef = useRef<number>(timer);
    const initialTimer = useRef<number>(15);
    const [timerStart, setTimerStart] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(0);

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

    useEffect(() => {
        if (timer === 0 && timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    }, [timer]);
    
    return (
        <div className="bg-bgColor">
            {/* <Timer timer={timer} />
            <Words noOfWords={50} setTimerStart={setTimerStart} timer={timer} setTypingSpeed={setTypingSpeed} initialTimer ={initialTimer.current}/> */}

            <SpeedGraph/>
        </div>
    );
}

export default App;
