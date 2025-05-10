import Letter from "./Letter";

interface WordType {
    word: string;
    wordIndex: number;
    currentWordIndex: number;
    currentLetterIndex: number;
    typedLetter: string;
}

const Word = ({
    word,
    wordIndex,
    currentWordIndex,
    currentLetterIndex,
    typedLetter,
}: WordType) => {
    return (
        <div key={wordIndex} className="mr-5 h-14 flex items-center">
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
                        />
                    ))}
        </div>
    );
};

export default Word;
