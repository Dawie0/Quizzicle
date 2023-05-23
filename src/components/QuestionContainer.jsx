/* eslint react/prop-types: 0 */
import { useState } from 'react'
import QuestionBlock from './QuestionBlock'


function QuestionContainer(props) {

    const [submit, setSubmit] = useState(false)
    const [score, setScore] = useState(0)
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
    
    function toggleSubmit() {
        setSubmit(true)
    }
    function restartQuiz() {
        console.log(score)
        window.location.reload()
    }
    function incrementScore(number) {
        setScore(number)
        console.log(score)
    }


    const questionElements = props.apiData.map((element) => {
        return(
            <div key={element.question}>
                <QuestionBlock 
                    question={element.question}
                    answers={shuffleOptions([...element.incorrect_answers, element.correct_answer])}
                    correct_answer={element.correct_answer}
                    submitted={submit}
                    incrementScore={incrementScore}
                />
            </div>
    )})

    return (
        <div>
            <div>{questionElements}</div>
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