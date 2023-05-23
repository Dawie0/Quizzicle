/* eslint react/prop-types: 0 */


function StartGame(props) {
    return (
        <div>
            <button onClick={props.handleClick}>Start Game</button>
        </div>
    )
}


export default StartGame