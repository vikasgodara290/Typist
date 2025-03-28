import { useEffect, useState } from 'react';
import english10k from '../assets/english_10k.json';
import Word from './Word';

interface WordsType {
    noOfWords: number;
}

export default function Words({ noOfWords }: WordsType) {
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        let wordsTemp: string[] = [];
        for (let i = 0; i < noOfWords; i++) {
            let randomIndex = Math.floor(Math.random() * 10000);
            wordsTemp.push(english10k.words[randomIndex]);
        }
        setWords(wordsTemp);
    }, [noOfWords]);

    return (
        <div className='flex items-center h-screen'>
            <div id='wordsDiv'>
                {/* <div id='outOfFocusWarning' className='absolute flex justify-center items-center w-11/12 h-42 text-2xl'>
                    Click here or press any key to focus
                </div> */}
                <div id='words' className='relative flex w-11/12 mx-auto h-42 flex-wrap text-4xl text-gray-500 overflow-hidden'>
                    {words.map((word, index) => (
                        <Word
                            key={index}
                            word={word}
                            wordIndex={index}
                            words={words}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
