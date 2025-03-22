import { useRef } from 'react';
import english10k from './assets/english_10k.json'

function App() {

  return (
    <>
      <Words noOfWords = {50}/>
    </>
  )
}

interface WordsType {
  noOfWords : number
}

function Words(props : WordsType){
  let Words: string[] = [];
  let randomIndex = 0;

  for(let i = 0; i < props.noOfWords; i++){
    randomIndex = Math.floor( Math.random() * 10000 );
    Words.push(english10k.words[randomIndex]);
  }

  return(
    <div className='flex items-center h-screen' contentEditable>
    <div className='flex w-3/4 flex-wrap text-4xl mx-auto text-gray-500'>
      {
        Words.map(
          (word, index) => {
            return <Word word={word} index={index}/>
          }
        )
      }
    </div>  
    </div>
  )
}

interface WordType {
  word : string,
  index : number
}
function Word({word, index} : WordType){
  
  return (
    <div key={index} className='mr-6 mb-7 h-7 flex items-center'>
      {
        word.split('').map(
          (letter, index) => (
            <Letter letter={letter} index={index}/>
          )
        )
      }
    </div>
  )
}

interface LetterType {
  letter : string,
  index : number
}
function Letter({letter, index} : LetterType){
  const letterRef = useRef(null);
  return(
    <p key={index} ref={letterRef}>{letter}</p>
  )
}

export default App
