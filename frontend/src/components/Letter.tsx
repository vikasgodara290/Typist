import { useRef, useEffect } from 'react';
interface LetterType {
    letter : string,
    letterIndex : number,
    wordIndex : number,
    autoFocus : boolean,
  }
 export default function Letter({letter, letterIndex, wordIndex, autoFocus} : LetterType){
    const letterRef = useRef(null);
    //const [typedLetter, setTypedLetter] = useState('');
  
    useEffect(() => {
      if (wordIndex === 0 && letterIndex === 0 && letterRef.current) {
        console.log('First letter mounted:', letterRef.current);
      }
    }, [autoFocus]);
  
    return(
      <div key={letterIndex} ref={letterRef} className=''>{letter}</div>
    )
}