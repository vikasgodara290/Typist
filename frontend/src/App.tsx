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
    <div className='flex items-center h-screen'>
    <div className='flex w-3/4 flex-wrap text-4xl mx-auto '>
      {
        Words.map(
          (word, index) => {
            return <div key={index} className='mr-6 mb-7 h-7 flex items-center'>{word}</div>
          }
        )
      }
    </div>  
    </div>
  )
}

export default App
