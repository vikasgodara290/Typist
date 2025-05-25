import { RefObject, useState } from "react";

interface ToolBarType{
    setUserSelectedTime : React.Dispatch<React.SetStateAction<number>>;
    initialTimer : RefObject<number>;
}
export default function ToolBar({setUserSelectedTime, initialTimer} : ToolBarType){
    const [selectedTime, setSelectedTime] = useState<number>(Number (localStorage.getItem("time"))   || 30);

    const handleTimerOnClick = (e : React.MouseEvent<HTMLSpanElement>) => {
        initialTimer.current = ( Number ((e.target as HTMLSpanElement).textContent));
        setUserSelectedTime(Number ((e.target as HTMLSpanElement).textContent));
        setSelectedTime(Number ((e.target as HTMLSpanElement).textContent));
    }
    return(
        <div className="w-[300px] h-10 rounded-[10px] bg-toolbar text-txtColor roboto-mono-300 flex items-center justify-between">
            <span className="pl-6 hover:cursor-pointer text-amber-500">time</span>
            <span className="h-3/4 w-1 rounded-2xl bg-txtColor"></span>
            <div className="grid grid-cols-4 gap-2 pr-6" >
                <span className={selectedTime === 15 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`} onClick={(e)=> handleTimerOnClick(e)}>15</span>
                <span className={selectedTime === 30 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>30</span>
                <span className={selectedTime === 60 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>60</span>
                <span className={selectedTime === 120 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>120</span>
            </div>
        </div>
    )
}