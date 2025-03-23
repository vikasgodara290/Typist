import { useEffect, useRef, useState } from 'react';
import english10k from '../assets/english_10k.json';
import Word from './Word';

interface WordsType {
    noOfWords: number;
}

export default function Words({ noOfWords }: WordsType) {
    const [words, setWords] = useState<string[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

    const wordsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 10000);
            wordsTemp.push(english10k.words[randomIndex]);
        }
        setWords(wordsTemp);
    }, [noOfWords]);

    function onKeyUpHandler(event: any) {
        if (!words[currentWordIndex]) return;

        const letter = event.key;
        const expectedLetter = words[currentWordIndex][currentLetterIndex];

        if (letter === expectedLetter) {
            if (currentLetterIndex + 1 < words[currentWordIndex].length) {
                setCurrentLetterIndex((prev) => prev + 1);
            } else {
                setCurrentWordIndex((prev) => prev + 1);
                setCurrentLetterIndex(0);
            }
        }
    }

    return (
        <div className='flex items-center h-screen'>
            <div id='wordsDiv' tabIndex={0} ref={wordsRef} onKeyUp={onKeyUpHandler}>
                <div id='outOfFocusWarning' className='absolute flex justify-center items-center w-11/12 h-42 text-2xl'>
                    Click here or press any key to focus
                </div>
                <div id='words' className='relative flex w-11/12 mx-auto h-42 flex-wrap text-4xl text-gray-500 overflow-hidden blur-sm'>
                    {words.map((word, index) => (
                        <Word
                            key={index}
                            word={word}
                            wordIndex={index}
                            currentWordIndex={currentWordIndex}
                            currentLetterIndex={currentLetterIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
