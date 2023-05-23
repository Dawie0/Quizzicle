import { useState, useEffect, useRef } from 'react'
import StartGame from './components/StartGamePage.jsx'
import QuestionContainer from './components/QuestionContainer.jsx'
// import QuestionSingle from './components/QuestionSingle.jsx'


// const api-website = 'https://opentdb.com/api_config.php'
// const apiUrl = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'


function App() {
  const effectRan = useRef(false)
  const [showQs, setShowQs] = useState(false)
  const [apiData, setApiData] = useState([]);

  async function apiFetch() {
    let response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    let data = await response.json()
    setApiData(data.results)
    }
  

  useEffect(() => {
      if(effectRan.current === false) {
      apiFetch()
      return () => {
        console.log('unmounted')
        effectRan.current = true
      }
    }  
  })

  function settingSetShowQs() {
    setShowQs(prevQ => !prevQ)
  }

  return (
    <div>
      {showQs ? <QuestionContainer apiData={apiData}/> : <StartGame handleClick={settingSetShowQs} /> }
    </div>
  )
}

export default App



/* eslint react/prop-types: 0 */