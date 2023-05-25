/* eslint react/prop-types: 0 */
import { useState, useEffect, useRef } from 'react'
import QuestionBlock from './QuestionBlock'
import { getSessionStorage, removeSessionStorage } from './storage'

function QuestionContainer({ urlData }) {
    const effectRan = useRef(false)

    const [submit, setSubmit] = useState(false)
    const [score, setScore] = useState(0)
    const [apiData, setApiData] = useState([]);
    

     async function apiFetch() {
        const response = await fetch("https://opentdb.com/api.php?amount=" +
            urlData.amount + 
            "&category=" + urlData.category +
            "&difficulty=" + urlData.difficulty + 
            "&type=" + urlData.type)
        const { results } = await response.json()
        setApiData(addOptionAndID(results))
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

    function shuffleOptions(optionsArr) {
        for (
          var j, x, i = optionsArr.length;
          i;
          j = parseInt(Math.random() * i),
            x = optionsArr[--i],
            optionsArr[i] = optionsArr[j],
            optionsArr[j] = x
        );
        return optionsArr;
    }
    function addOptionAndID(arr) {
        const data = arr.map((results, i) => {
            return {
                ...results,
                options: shuffleOptions([...results.incorrect_answers, results.correct_answer]),
                id: i,
            };
        });
        return data;
    }
    
    function toggleSubmit() {
        const selectedAnswers = getSessionStorage('answers')
        removeSessionStorage('answers')
        let scoreCount = 0
        const resultsArray = apiData.map((element, i) => {
            const isAnswerCorrect = element.correct_answer === selectedAnswers[i]
            element.isAnswerRight = isAnswerCorrect
            if (isAnswerCorrect) scoreCount++
            return element
        })
        setApiData(resultsArray)
        setScore(scoreCount)
        setSubmit(true)
    }
    function restartQuiz() {
        console.log(score)
        window.location.reload()
    }

    return (
        <div>
            {
               apiData.map((element, i) => {
                return(
                    <QuestionBlock 
                        key={i}
                        apiData={element}
                        submitted={submit}
                    />)
               }) 
            }
            <button 
                onClick={submit ? restartQuiz : toggleSubmit}>
                {`${submit ? 'Try Again' : 'Check Answers'}`}
            </button>
            <div >
                {submit && <h2>{`You scored ${score} points`}</h2>}
            </div>
        </div>
    )
}


export default QuestionContainer