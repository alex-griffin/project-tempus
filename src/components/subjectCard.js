import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class SubjectCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject
    }
  }

  attemptData() {
    let total =   this.state.subject.cards.reduce((acc, cur) => acc + cur.attempted, 0)
    let correct = this.state.subject.cards.reduce((acc, cur) => acc + cur.correct, 0)
    let pCorrect = correct / total;
    return {
      total,
      correct,
      pCorrect
    }
  }

  render() {
    let attempts = this.attemptData()
    let style = {
      correct:   {height: attempts.pCorrect * 100 + "%"},
      incorrect: {height: (Math.abs(attempts.pCorrect - 1) * 100) + "%"}
    }
    let sidebar;
    if(attempts.total !== 0) {
      sidebar = (
        <div className="progress">
          <div className="atmptData correct" style={style.correct}>
            <span className="tooltip">{attempts.correct} correct answers</span>
          </div>
          <div className="atmptData incorrect" style={style.incorrect}>
            <span className="tooltip">{attempts.total - attempts.correct} incorrect answers</span>
          </div>
        </div>
      )
    } else {
      sidebar = (
        <div className="progress">
          <div className="atmptData ncorrect" style={{height: "100%"}}>
            <span className="tooltip">No answer data</span>

          </div>
        </div>
      )
    }

    return (
      <div className="subjectCard">
        <Link to={"/app/subjects/" + this.state.subject.name}>
          {sidebar}
          <h1>{this.state.subject.name}</h1>
          <p>{ this.state.subject.description.substr(0, 100)}...</p>
        </Link>
      </div>
    )
  }
}
