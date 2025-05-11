import Letter from "./Letter";

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
    setCurrentLetterPos : any;
}

const Word = ({
    word,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
    setCurrentLetterPos
}: WordType) => {
    return (
        <div key={wordIndex} className="mr-5.5 h-14 flex items-center">
            {word &&
                word
                    .split("")
                    .map((letter, index) => (
                        <Letter
                            key={index}
                            letter={letter}
                            letterIndex={index}
                            wordIndex={wordIndex}
                            currentWordIndex={currentWordIndex}
                            currentLetterIndex={currentLetterIndex}
                            typedLetter={typedLetter}
                            setCurrentLetterPos={setCurrentLetterPos}
                            wordLength={word.length}
                        />
                    ))}
        </div>
    );
};

export default Word;
