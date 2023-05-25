/* eslint react/prop-types: 0 */
import { useState } from 'react'

function StartGame(props) {
    const [ready, setReady] = useState(true)
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        difficulty: '',
        type: ''
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }


    function toggleReady() {
        if(!ready){
            props.settingUrlData(formData)
            console.log("set")
        }
        setReady(!ready)
        console.log(ready)
    }
    return (
        <div>
            <button></button>
            {ready ? <div><button onClick={props.startTheGame}>Start Game</button>
            <button onClick={toggleReady}>Settings</button></div> : 
                <div> 
                    <input 
                        type='number'
                        placeholder='enter a number between 1 and 10'
                        onChange={handleChange}
                        name='amount'
                        value={formData.amount}/>

                    <label htmlFor='category'>Choose Category</label>
                        <select name="category" id="category" value={formData.category} onChange={handleChange}>
                            <option value={''}>Any Category</option>
                            <option value={'9'}>General Knowledge</option>
                            <option value={'10'}>Entertainment: Books</option>
                            <option value={'11'}>Entertainment: Film</option>
                            <option value={'12'}>Entertainment: Music</option>
                            <option value={'13'}>Entertainment: Musicals & Theaters</option>
                            <option value={'14'}>Entertainment: Television</option>
                            <option value={'15'}>Entertainment: Video Games</option>
                            <option value={'16'}>Entertainment: Board Games</option>
                            <option value={'17'}>Science & Nature</option>
                            <option value={'18'}>Science: Computers</option>
                            <option value={'19'}>Science: Mathematics</option>
                            <option value={'20'}>Mythology</option>
                            <option value={'21'}>Sports</option>
                            <option value={'22'}>Geography</option>
                            <option value={'23'}>History</option>
                            <option value={'24'}>Politics</option>
                            <option value={'25'}>Art</option>
                            <option value={'26'}>Celebrities</option>
                            <option value={'27'}>Art</option>
                            
                        </select>
                    
                    <label htmlFor='difficulty'>Choose Difficulty</label>
                        <select name="difficulty" id="difficulty" value={formData.difficulty} onChange={handleChange}>
                            <option value={'easy'}>easy</option>
                            <option value={'medium'}>medium</option>
                            <option value={'hard'}>hard</option>
                        </select>

                    <label htmlFor='type'>Choose Question Type</label>
                        <select name="type" id="type" value={formData.type} onChange={handleChange}>
                            <option value={'multiple'}>Multiple Answers</option>
                            <option value={'boolean'}>True or False</option>
                        </select>

                <button onClick={toggleReady}>Back</button></div>}
        </div>
    )
}


export default StartGame