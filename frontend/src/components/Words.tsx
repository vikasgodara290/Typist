import { useEffect, useRef, useState } from 'react';
import english10k from '../assets/english_10k.json';
import Word from './Word';

interface WordsType {
    noOfWords: number;
}

export default function Words({ noOfWords }: WordsType) {
    const [words, setWords] = useState<string[]>([]);
    const wordDivRef = useRef<HTMLDivElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isCompleteRender, setIsCompleteRender] = useState<boolean>(false);

    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 10000);
            wordsTemp.push(english10k.words[randomIndex]);
        }
        setWords(wordsTemp);
    }, [noOfWords]);
    
    //When words changes : complete re-render else re-render a single word only
    useEffect(()=>{
        setIsCompleteRender(true);
    },[words])

    function onKeyUpHandler(e:React.KeyboardEvent<HTMLDivElement>){        
        if(e.key == ' '){
            setCurrentLetterIndex(0);
            setCurrentWordIndex(currentWordIndex+1);
            return;
        }

        if(e.key !== words[currentWordIndex].charAt(currentLetterIndex)){
            setIsCorrect(false)
        }
        else{
            setIsCorrect(true);
        }

        if(words[currentWordIndex].length > currentLetterIndex){
            setCurrentLetterIndex(currentLetterIndex+1);
        }

        //console.log(isCorrect+' '+e.key + '  '+ words[currentWordIndex].charAt(currentLetterIndex) + ' '+ currentWordIndex + ' '+currentLetterIndex+ ' '+ words[currentWordIndex].length);
    }
    document.addEventListener('keyup', ()=>{wordDivRef.current?.focus();})

    //render check
    console.log('Words Render ' + isCompleteRender);

    return (
        <div className='flex items-center h-screen'>
            <div id='wordsDiv' tabIndex={1} ref={wordDivRef} onKeyUp={onKeyUpHandler}>
                <div id='outOfFocusWarning' className='absolute flex justify-center items-center w-11/12 h-42 text-2xl'>
                    Click here or press any key to focus
                </div>
                <div id='words' className='relative flex w-11/12 mx-auto h-42 flex-wrap text-4xl text-gray-500 overflow-hidden blur-[5px]'>
                    {words && isCompleteRender && words.map((word, index) => (
                        <Word
                            key={index}
                            word={word}
                            wordIndex={index}
                            currentWordIndex={currentWordIndex}
                            currentLetterIndex={currentLetterIndex}
                            isCorrect={isCorrect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
