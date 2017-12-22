import React, { Component } from "react"

export default class SubjectCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject
    }
  }

  render() {
    let preItems = [];
    for(let i = 0; i < 3; i++) {
      preItems.push((
        <li key={i}>{this.state.subject.cards[i].prompt}</li>
      ))
    }
    
    let total =   this.state.subject.cards.reduce((acc, cur) => acc + cur.attempted, 0)
    let correct = this.state.subject.cards.reduce((acc, cur) => acc + cur.correct, 0)
    let pCorrect = correct / total;

    console.log("total: " + total + " | correct: " + correct + " | pCorrect: " + pCorrect)
    let style = {
      correct:   {height: pCorrect * 100 + "%"},
      incorrect: {height: (Math.abs(pCorrect - 1) * 100) + "%"}
    }
    console.log(style.correct)
    return (
      <div className="subjectCard">
        <div className="progress">
          <div className="correct" style={style.correct}></div>
          <div className="incorrect" style={style.incorrect}></div>
        </div>
        <h1>{this.state.subject.name}</h1>
        <ul>
          {preItems}
        </ul>
      </div>
    )
  }
}
