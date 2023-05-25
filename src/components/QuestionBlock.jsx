/* eslint react/prop-types: 0 */
import { useState } from 'react'
import Button from './Button.jsx'
import { setSessionStorage } from './storage'

function QuestionBlock({ apiData, submitted }) {

    const [selectedOption, setSelectedOption] = useState(null);

    function selectOption(event) {
        setSelectedOption(event.target.dataset.option);
        setSessionStorage('answers', {[apiData.id]: event.target.dataset.option})
    }

    if (submitted === true) {
        return (
            <div className='main-container'>
                <h5 className='question-text'>{apiData.question}</h5>
                <div className="possible-questions-div option-container">
                        {apiData.options.map((element) => {
                            
                            let newClassName = ''
                            if (selectedOption === element) {
                                if (element === apiData.correct_answer) {
                                    newClassName = "correct"
                                }
                                else {
                                    newClassName = 'wrong'
                                }
                            }
                            else {
                                if (element === apiData.correct_answer) {
                                    newClassName = 'correct-answer'
                                }
                                else {
                                    newClassName = ''
                                }
                                
                            }   
                            
                            return (
                                <Button 
                                    key={element}
                                    text={element}
                                    className={`${newClassName}`}
                                /> )})}
                </div>
            </div>)}
    else {
        return(
        <div className='main-container'>
            <h5 className='question-text'>{apiData.question}</h5>
            <div className="possible-questions-div option-container">
                {apiData.options.map((element) => {
                    return(
                        <Button 
                            key={element}
                            text={element}
                            data-option={element}
                            onClick={selectOption}
                            className={`${selectedOption === element ? 'selected' : ''}`}
                        />
                    )})}
            </div>
        </div>)}
}

export default QuestionBlock