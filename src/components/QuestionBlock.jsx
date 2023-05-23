/* eslint react/prop-types: 0 */
import { useState } from 'react'
import Button from './Button.jsx'

function QuestionBlock(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    let score = 0
    function selectOption(event) {
        setSelectedOption(event.target.dataset.option);
        if (selectedOption === props.correct_answer) {
            score += 1
            props.incrementScore(score)
        }
    }


    const answersElement = props.answers.map((element) => {
        return (
            <div key={element}>
                <Button 
                    key={element}
                    text={element}
                    data-option={element}
                    onClick={selectOption}
                    className={`${selectedOption === element ? 'selected' : ''}`}
                    submitted={props.submitted}
                    correct_answer={props.correct_answer}
                    selectedOption={selectedOption}
                    />
                    
            </div>
        )
    })
    return (
        <div className='main-container'>
            <h5 className='question-text'>{props.question}</h5>
            <div className="possible-questions-div option-container">
                {answersElement}
            </div>
        </div>
    )
}

export default QuestionBlock