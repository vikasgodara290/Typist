import Letter from './Letter';
interface WordType {
  word : string,
  wordIndex : number
}
export default function Word({word, wordIndex} : WordType){
  
  return (
    <div id='word' key={wordIndex} className='mr-5 h-14 flex items-center'>
      {
        word.split('').map(
          (letter, index) => (
            <Letter letter={letter} letterIndex={index} wordIndex={wordIndex} autoFocus={wordIndex === 0 && index === 0}/>
          )
        )
      }
    </div>
  )
}