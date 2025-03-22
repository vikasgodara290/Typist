import english10k from '../assets/english_10k.json'
import Word from './Word';

interface WordsType {
  noOfWords : number
}

export default function Words(props : WordsType){
  let Words: string[] = [];
  let randomIndex = 0;

  for(let i = 0; i < props.noOfWords; i++){
    randomIndex = Math.floor( Math.random() * 10000 );
    Words.push(english10k.words[randomIndex]);
  }

  return(
    <div className='flex items-center h-screen'>
    <div id='wordsDiv' tabIndex={0}>
      <div id='outOfFocusWarning' className='absolute flex justify-center items-center w-11/12 h-42 text-2xl'>Click here or press any key to focus</div>
      <div id='words' className='relative flex w-11/12 mx-auto h-42 flex-wrap text-4xl text-gray-500 overflow-hidden blur-sm' >
        {
          Words.map(
            (word, index) => {
              return <Word word={word} wordIndex={index}/>
            }
          )
        }
      </div>  
    </div>
    </div>
  )
}