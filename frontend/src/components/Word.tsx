import Letter from './Letter';

interface WordType {
    word: string;
    wordIndex: number;
    words: string[]
}

function Word({ word, wordIndex, words }: WordType){
    return (
        <div key={wordIndex} className='mr-5 h-14 flex items-center'>
            {word.split('').map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    letterIndex={index}
                    wordIndex={wordIndex}
                    words={words}
                />
            ))}
        </div>
    );
};

export default Word;
