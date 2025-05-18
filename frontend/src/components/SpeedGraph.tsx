import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { SpeedDataBySecondType } from "../types";
// import "./styles.css";

interface SpeedGraphProps{
    typingSpeed: number;
    speedDataBySecond: SpeedDataBySecondType[];
}

const SpeedGraph = ({typingSpeed, speedDataBySecond} : SpeedGraphProps) => {
    return (
        <div className="h-screen w-screen bg-bgColor flex pt-[250px] px-28">
            <div className="w-32 h-36 flex flex-wrap ml-auto">
                <div className="mx-auto text-[32px] text-txtColor">wpm</div>
                <div className="mx-auto text-[64px] text-amber-500">{Math.round(typingSpeed)}</div>
            </div>
            <ResponsiveContainer
                width="85%"
                height={400}
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
                    <XAxis dataKey="second" padding={{ left: 0, right: 0 }} />
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
        </div>
    );
};

export default SpeedGraph;
