import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
// import "./styles.css";

interface SpeedGraphProps{
    typingSpeed: number;
}

const data = [
    {
        name: 1,
        wpm: 400,
    },
    {
        name: 2,
        wpm: 300,
    },
    {
        name: 3,
        wpm: 200,
    },
    {
        name: 4,
        wpm: 278,
    },
    {
        name: 5,
        wpm: 180,
    },
    {
        name: 6,
        wpm: 200,
    },
    {
        name: 7,
        wpm: 340,
    },
];

const SpeedGraph = ({typingSpeed} : SpeedGraphProps) => {
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
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" padding={{ left: 0, right: 0 }} />
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
