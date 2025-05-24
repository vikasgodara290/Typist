import { RefObject } from "react";

interface ToolBarType{
    setTimer : React.Dispatch<React.SetStateAction<number>>;
    initialTimer : RefObject<number>;
}
export default function ToolBar({setTimer, initialTimer} : ToolBarType){

    const handleTimerOnClick = (e : React.MouseEvent<HTMLSpanElement>) => {
        initialTimer.current = ( Number ((e.target as HTMLSpanElement).textContent));
        
    }
    return(
        <div className="w-[300px] h-10 rounded-[10px] bg-toolbar text-txtColor roboto-mono-300 flex items-center justify-between">
            <span className="pl-6 hover:cursor-pointer">time</span>
            <span className="h-3/4 w-1 rounded-2xl bg-txtColor"></span>
            <div className="grid grid-cols-4 gap-2 pr-6" >
                <span className="hover:cursor-pointer" onClick={ (e)=> handleTimerOnClick(e)}>15</span>
                <span className="hover:cursor-pointer" onClick={handleTimerOnClick}>30</span>
                <span className="hover:cursor-pointer" onClick={handleTimerOnClick}>60</span>
                <span  className="hover:cursor-pointer" onClick={handleTimerOnClick}>120</span>
            </div>
        </div>
    )
}