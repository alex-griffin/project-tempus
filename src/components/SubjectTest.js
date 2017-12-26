import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class SubjectTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.location.state,
      subject: api.getName(props.match.params.subject),
    }
  }

  generateTest() {
    function getRandom(arr, n) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len;
      }
      return result;
    }

    let questions = [];

    for(let i = 0; i < this.state.questions.multipleChoice; i++) {

      let answers = getRandom(this.state.subject.cards, 4)
      let correctAnswer = Math.floor(Math.random() * answers.length)

      let question = answers.map((item, i) => {
        return (
          <div className="answer" key={i}>
            <label className="answerOption">
              <input name={ answers[correctAnswer].prompt }
                     value={ i === correctAnswer }
                     type="radio"/>
              <span>{ item.answer }</span>
              <span className="border"></span>
            </label>
          </div>
        )
      })

      questions.push((
        <div key={questions.length} className="question multipleChoice">
          <p>{ answers[correctAnswer].prompt }</p>
          <div className="answerOptions">
            { question }
          </div>
        </div>
      ))
    }



    return questions;
  }


  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }

    return (
      <div id="test">
        <form onSubmit={this.handleSubmit}>
          { this.generateTest() }
        </form>
      </div>
    )
  }
}
