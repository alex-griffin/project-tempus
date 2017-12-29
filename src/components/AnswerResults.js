import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class AnswerResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  getPercentCorrect() {
    return Math.floor(this.state.answerData.reduce((acc, cur) => acc + (cur.correct === "correct" ? 1 : 0), 0) / this.state.answerData.length * 100)
  }

  getColor() {
    let percent = this.getPercentCorrect();
    return percent > 70 ? percent > 80 ? "green" : "yellow" : "red"
  }

  render() {
    return(
      <div className="answerResults">
        <h1 className={ this.getColor.call(this) }>{ this.getPercentCorrect.call(this) + "%" }</h1>
        <button className="button">
          <Link to={"/app/subjects/" + this.state.subject.name}>
            Back to subject
          </Link>
        </button>

        <button className="button">
          <Link to={{pathname: "/app/subjects/test/configure",
                    state: { subject: this.state.subject.name }}}>
            Test again
          </Link>
        </button>

        <button className="button">
          <Link to={"/app/subjects/" + this.state.subject.name + "/study"}>
            Study
          </Link>
        </button>
      </div>
    )
  }
}
