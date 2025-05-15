interface TimerProps {
    timer: number;
}
const Timer = ({ timer }: TimerProps) => {
    return (
        <>
            <span className="text-amber-500 text-4xl fixed mt-68 ml-[72px]">
                {timer}
            </span>
        </>
    );
};

export default Timer;
