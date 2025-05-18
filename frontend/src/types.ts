

interface SpeedDataBySecondType {
    second: number,
    wpm: number
}

interface LetterTrackingType {
    wordIndex : number,
    letterIndex : number,
    isCorrect : boolean | undefined
}

export type { SpeedDataBySecondType ,LetterTrackingType }