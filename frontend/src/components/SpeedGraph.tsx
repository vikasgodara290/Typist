import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { LetterTrackingType, SpeedDataBySecondType } from "../types";
import { useEffect, useRef } from "react";
// import "./styles.css";

interface SpeedGraphProps {
    typingSpeed: number;
    speedDataBySecond: SpeedDataBySecondType[];
    time: number;
    letterTracker: LetterTrackingType[];
    totalIncorrectLetterP:number;
}

const SpeedGraph = ({
    typingSpeed,
    speedDataBySecond,
    time,
    letterTracker,
    totalIncorrectLetterP
}: SpeedGraphProps) => {
    const characters = useRef<{
        total: number;
        correct: number;
        wrong: number;
    }>({ total: 0, correct: 0, wrong: 0 });
    const accuracy = useRef<number>(0);

    useEffect(() => {
        let total = 0;
        let correct = 0;
        let wrong = 0;

        total = letterTracker.length;
        wrong = letterTracker.filter((item) => item.isCorrect === false).length;
        const wrongArr = letterTracker
            .filter((item) => item.isCorrect === false)
            .map((item) => item.wordIndex);
        correct = letterTracker.filter(
            (item) =>
                item.isCorrect === true && !wrongArr.includes(item.wordIndex)
        ).length;

        characters.current = { total: total, correct: correct, wrong: wrong };

        if(totalIncorrectLetterP !== 0){
            accuracy.current = (correct/ (correct + totalIncorrectLetterP))*100;
        }
        else{
            accuracy.current = 100;
        }
    }, []);

    return (
        <div className="h-screen w-screen bg-bgColor flex pt-[250px] px-28 roboto-mono-400">
            <div className="w-28 h-36 grid grid-cols-1">
                <div className="text-[32px] text-txtColor ">wpm</div>
                <div className="text-[64px] text-amber-500">
                    {Math.round(typingSpeed)}
                </div>
                <div className="text-[32px] text-txtColor">acc</div>
                <div className="text-[64px] text-amber-500">
                    {`${Math.round(accuracy.current)}%`}
                </div>
            </div>

            <div className="absolute transform rotate-270 mx-32 mt-32 text-txtColor text-[18px]">
                Words Per Minute
            </div>
            <div className="w-full">
                <ResponsiveContainer
                    width="85%"
                    height={300}
                    className={"flex mx-auto"}
                >
                    <AreaChart
                        data={speedDataBySecond}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis
                            dataKey="second"
                            padding={{ left: 0, right: 0 }}
                        />
                        <YAxis />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="wpm"
                            stroke="oklch(0.769 0.188 70.08)"
                            strokeWidth={3}
                            fill="#272727"
                            dot={true}
                            activeDot={{ r: 8 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="flex w-[80%] mx-auto pl-5 pt-8 text-txtColor h-20">
                    <div className="grid grid-cols-1 w-1/2">
                        <span className="text-[16px]">characters (total/correct/incorrect)</span>
                        <span className="text-[32px] text-amber-500">{`${characters.current.total}/${characters.current.correct}/${characters.current.wrong}`}</span>
                    </div>
                    <div className="grid grid-cols-1 w-1/2">
                        <span className="text-[16px]">time</span>
                        <span className="text-[32px] text-amber-500">{`${time}s`}</span>
                    </div>
                </div>
                <div className="text-txtColor roboto-mono-300 text-[12px] flex justify-center items-center mt-36">
                    <span className="w-fit h-fit bg-correctTxt rounded-[2px] p-1 mr-2">
                        tab
                    </span>
                    - restart
                </div>
            </div>
        </div>
    );
};

export default SpeedGraph;
