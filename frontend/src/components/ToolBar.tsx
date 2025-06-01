interface ToolBarType{
    setUserSelectedTime : React.Dispatch<React.SetStateAction<number>>;
    userSelectedTime:number;
}
export default function ToolBar({userSelectedTime, setUserSelectedTime} : ToolBarType){

    const handleTimerOnClick = (e : React.MouseEvent<HTMLSpanElement>) => {
        setUserSelectedTime(Number ((e.target as HTMLSpanElement).textContent));
    }
    return(
        <div className="w-[300px] h-10 rounded-[10px] bg-toolbar text-txtColor roboto-mono-300 flex items-center justify-between">
            <span className="pl-6 hover:cursor-pointer text-amber-500">time</span>
            <span className="h-3/4 w-1 rounded-2xl bg-txtColor"></span>
            <div className="grid grid-cols-4 gap-2 pr-6" >
                <span className={userSelectedTime === 15 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`} onClick={(e)=> handleTimerOnClick(e)}>15</span>
                <span className={userSelectedTime === 30 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>30</span>
                <span className={userSelectedTime === 60 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>60</span>
                <span className={userSelectedTime === 120 ? `hover:cursor-pointer text-amber-500` : `hover:cursor-pointer`}  onClick={(e)=> handleTimerOnClick(e)}>120</span>
            </div>
        </div>
    )
}