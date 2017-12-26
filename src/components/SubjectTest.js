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
  autoResize(event) {
    event.target.style.height = 0
    event.target.style.height = event.target.scrollHeight + "px"
  }

  generateTest() {
    function getRandom(arr, n, not) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      console.log("not: " + not)
      while (n--) {
        var x = Math.floor(Math.random() * len);
        if(x !== not) {
          result[n] = arr[(x in taken) ? taken[x] : x];
          taken[x] = --len;
        } else n++
      }
      return result;
    }

    let questions = [];
    console.log(this.state.questions)
    let configQs = getRandom(this.state.subject.cards,
                             (this.state.questions.multipleChoice +
                              this.state.questions.textResponce))
    let MCquestions = configQs.slice(0, this.state.questions.multipleChoice);

    let FRquestions = configQs.slice(this.state.questions.multipleChoice,
                                     this.state.questions.multipleChoice + this.state.questions.textResponce);

    for(let i = 0; i < MCquestions.length; i++) {
      let answers = [];
      answers.push(MCquestions[i]);
      let not = this.state.subject.cards.indexOf(MCquestions[i]);
      let wrong = getRandom(this.state.subject.cards, 3, not);
      console.log(wrong)

      answers = answers.concat(wrong)
      answers = answers.sort(() => Math.random() - 0.5)


      let correctAnswer = answers.indexOf(MCquestions[i]);
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

    for(let i = 0; i < FRquestions.length; i++) {

      questions.push((
        <div key={questions.length} className="question textResponce">
          <p>{ FRquestions[i].prompt }</p>
          <div className="textAnswer answer">
            <textarea name={ FRquestions[i].answer }
                      className="textAnswer"
                      onChange={this.autoResize.bind(this)} />
                        <span className="border"></span>
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
          <div className="cf">
            <button className="button">submit</button>
          </div>
        </form>
      </div>
    )
  }
}
