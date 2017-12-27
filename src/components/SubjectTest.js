import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import api from "../services/api.js"
const queryString = require('query-string');

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

export default class SubjectTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.location.state,
      subject: api.getName(props.match.params.subject),
      redirect: false,
    }
  }
  autoResize(event) {
    event.target.style.height = 0
    event.target.style.height = event.target.scrollHeight + "px"
  }

  componentDidMount() {
    this.generateTest()
  }

  generateTest() {
    function mcQuestion(index, q, correct = "") {

      let answers = [];
      answers.push(q);
      let not = this.state.subject.cards.indexOf(q);
      let wrong = getRandom(this.state.subject.cards, 3, not);

      answers = answers.concat(wrong)
      answers = answers.sort(() => Math.random() - 0.5)

      let correctAnswer = answers.indexOf(q);

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
      return (
        <div key={index} className="question multipleChoice">
          <p>{ answers[correctAnswer].prompt }</p>
          <div className="answerOptions">
            { question }
          </div>
        </div>
      )
    }

    function frQuestion(key, question, corrrect = "") {

      return (
        <div key={key} className={"question textResponce " + corrrect}>
          <p>{ question.prompt }</p>
          <div className="textAnswer answer">
            <textarea name={ question.answer }
                      className="textAnswer"
                      onChange={this.autoResize.bind(this)} />
                        <span className="border"></span>
          </div>
        </div>
      )
    }
    let questions = [];

    if(this.state.questions) {
      if(!this.state.answerData) {
        let configQs = getRandom(this.state.subject.cards,
                                 parseInt(this.state.questions.multipleChoice, 10) +
                                 parseInt(this.state.questions.textResponce, 10))
        let MCquestions = configQs.slice(0, this.state.questions.multipleChoice);

        let FRquestions = configQs.slice(this.state.questions.multipleChoice,
                                         this.state.questions.multipleChoice + this.state.questions.textResponce);

        for(let i = 0; i < MCquestions.length; i++) {
          questions.push(
            mcQuestion.call(this, questions.length, MCquestions[i])
          )
        }

        for(let i = 0; i < FRquestions.length; i++) {
          questions.push(
            frQuestion.call(this, questions.length, FRquestions[i])
          )
        }
      } else if(this.state.answerData) {
        for(let i = 0; i < this.state.answerData.length; i++) {
          if(this.state.answerData[i].type == "multipleChoice") {
            questions.push()
          }
        }
      }
      this.setState({ questionElements: questions })
      return questions;
    } else {
      return (
        <h1 className="sorry">
          ¯\_(ツ)_/¯ <br/>
          Invalid Test or subject
        </h1>
      )
    }
  }

  gradeMCquestion(element) {
    let answer = element.querySelector('input[type="radio"][value="true"]')
    element.classList.add(answer.checked ? "correct" : "incorrect")
    return answer.checked
  }

  gradeFRquestion(element) {
    let answer = element.querySelector("textarea")
    element.classList.add((answer.value === answer.name) ? "correct" : "incorrect");
    return (answer.value === answer.name)
  }

  gradeTest() {
    let answerData = []
    let questions = document.getElementsByClassName("question")

    for(let i = 0; i < questions.length; i++) {
      if(questions[i].classList.contains("multipleChoice")) {
        answerData.push({
          index: this.state.subject.cards.indexOf(
                   this.state.subject.cards.filter(
                     card => card.prompt === questions[i].querySelector("p").innerHTML)),
          correct: this.gradeMCquestion(questions[i]),
          type: "multipleChoice"
        })
      } else if(questions[i].classList.contains("textResponce")) {
        answerData.push({
          index: this.state.subject.cards.indexOf(
                   this.state.subject.cards.filter(
                     card => card.prompt === questions[i].querySelector("p").innerHTML)),
          correct: this.gradeFRquestion(questions[i]),
          type: "textResponce"
        })
      }
    }
    console.log(document.getElementById("questions"))
    // this.setState({questionElements: document.getElementById("questions")})
    this.setState({answerData})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.gradeTest()
  }

  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }
    if(this.state.showResults) {
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
        <form onSubmit={this.handleSubmit.bind(this)} className="questions">
          <div id="questions">
            { this.state.questionElements }
          </div>
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
