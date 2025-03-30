import Letter from './Letter';

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    isCorrect: boolean|null
}

function Word({ word, wordIndex, currentWordIndex, currentLetterIndex, isCorrect}: WordType){
    return (
        <div key={wordIndex} className='mr-5 h-14 flex items-center'>
            {word && word.split('').map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    letterIndex={index}
                    wordIndex={wordIndex}
                    currentWordIndex={currentWordIndex}
                    currentLetterIndex={currentLetterIndex}
                />
            ))}
        </div>
    );
};

export default Word;
