/* eslint react/prop-types: 0 */
import './Button.css';

//we are passing props that we will be using in other components and also "...otherButtonAttributes" to pass other attributes later like 'onClick' etc.

function Button({ selectedOption, correct_answer, submitted, text, className, type = 'button', ...otherButtonAttributes }) {
    let newClassName = className
    if(submitted){
        if (selectedOption === text) {
            if(text === correct_answer) {
                newClassName = 'correct'
            }
            else {
                newClassName = 'wrong'
            }
        }
        else {
            if (text === correct_answer) {
                newClassName = 'correct-answer'
            }
            else {
                newClassName = ''
            }
        }
        
    }

  return (
    <button className={`btn ${newClassName}`} type={type} {...otherButtonAttributes} disabled={submitted ? true : false}>
      {text}
    </button>
  );
}

export default Button;