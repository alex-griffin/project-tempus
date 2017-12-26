import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import api from "../services/api.js"
const queryString = require('query-string');


export default class SubjectTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.location.state,
      subject: api.getName(props.match.params.subject),
      redirect: false
    }
  }
  autoResize(event) {
    event.target.style.height = 0
    event.target.style.height = event.target.scrollHeight + "px"
  }

  generateTest() {
    if(this.state.questions) {
      function getRandom(arr, n, not) {
        var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
        if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
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
      let configQs = getRandom(this.state.subject.cards,
                               parseInt(this.state.questions.multipleChoice, 10) +
                               parseInt(this.state.questions.textResponce, 10))
      let MCquestions = configQs.slice(0, this.state.questions.multipleChoice);

      let FRquestions = configQs.slice(this.state.questions.multipleChoice,
                                       this.state.questions.multipleChoice + this.state.questions.textResponce);

      for(let i = 0; i < MCquestions.length; i++) {
        let answers = [];
        answers.push(MCquestions[i]);
        let not = this.state.subject.cards.indexOf(MCquestions[i]);
        let wrong = getRandom(this.state.subject.cards, 3, not);

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
      this.state.questionElements = questions
      return questions;
    }
    return (
      <h1 className="sorry">
        ¯\_(ツ)_/¯ <br/>
        No test specified
      </h1>
    )
  }

  gradeMCquestion(element) {
    let answer = element.querySelector('input[type="radio"][value="true"]')
    console.log(answer)
    return answer.checked ? "correct" : "incorrect"
  }

  gradeFRquestion(element) {
    elt answer = 
  }

  gradeTest() {
    let answerData = []
    let questions = document.getElementsByClassName("question")
    console.log(questions);

    for(let i = 0; i < questions.length; i++) {
      if(questions[i].classList.contains("multipleChoice")) {
        questions[i].classList.add(this.gradeMCquestion(questions[i]))
      }

    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.gradeTest()
    // this.setState({redirect: true})
  }

  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }
    if(this.state.redirect) {
      return(
        <Redirect to={{pathname: "/app/subjects/" + this.state.subject.name + "/test/grade",
                       state: {
                         prevTest: this.state.questionElements,
                         answers:  this.state.answerData
                       }}}></Redirect>
      )
    }
    return (
      <div id="test">
        <form onSubmit={this.handleSubmit.bind(this)}>
          { this.generateTest() }
          <div className="cf">
            <button className="button" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
