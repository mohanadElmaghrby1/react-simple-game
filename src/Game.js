const { Component } = require("react");

class Game extends Component {

    constructor(props) {
        super(props)
        this.state = this.makeAnewQuestion();
    }

    makeAnewQuestion() {
        const value1 = Math.floor(Math.random() * 100);
        const value2 = Math.floor(Math.random() * 100);
        const value3 = Math.floor(Math.random() * 100);
        const proposedAnswer = Math.floor(Math.random() * 3) + (value1 + value2 + value3);
        return {
            value1: value1,
            value2: value2,
            value3: value3,
            proposedAnswer: proposedAnswer
        }
    }

    handleAnswer = event => {
        const newGameValues = this.makeAnewQuestion();
        this.updateState(newGameValues);
        const isAnswerCorrect = this.evaluateAnswer(event.target.name)
        this.props.handleAnswer(isAnswerCorrect);
    }
    evaluateAnswer(answer) {
        const {value1,value2,value3,proposedAnswer} = this.state;
        const correctAnswer = value1+value2+value3;
        return (answer === 'true' && correctAnswer === proposedAnswer) ||
        (answer === 'false' && correctAnswer !== proposedAnswer)
    }

    updateState = (newGameValues) => {
        const { value1, value2, value3, proposedAnswer } = newGameValues;
        this.setState((currState) => ({
            value1: value1,
            value2: value2,
            value3: value3,
            proposedAnswer: proposedAnswer
        }))
    }

    render() {
        const { value1, value2, value3, proposedAnswer } = this.state;
        return (
            // without this '(', JS will automatically put a ';' after 'return.'
            <div>
                <div className="equation">
                    <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
                </div>
                <button onClick={this.handleAnswer} name="true">
                    True
              </button>
                <button name="false" onClick={this.handleAnswer}>
                    False
              </button>
            </div>
        );
    }
}

export default Game;