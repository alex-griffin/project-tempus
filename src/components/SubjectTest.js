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

class MCQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: props.answers,
      correct: props.correct,
      correctAnswer: props.correctAnswer,
      selected: props.selected
    }
  }
  render() {
    let question = this.state.answers.map((item, i) => {
      return (
        <div className="answer" key={i}>
          <label className="answerOption">
            <input name={ this.state.answers[this.state.correctAnswer].prompt }
                   value={ i === this.state.correctAnswer }
                   defaultChecked={ this.state.selected === i }
                   type="radio"/>
            <span>{ item.answer }</span>
            <span className="border"></span>
          </label>
        </div>
      )
    })
    return (
      <div className={"question multipleChoice " + this.state.correct}>
        <p className="prompt">{ this.state.answers[this.state.correctAnswer].prompt }</p>
        <div className="answerOptions">
          { question }
        </div>
      </div>
    )
  }
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

    function frQuestion(key, question, corrrect = "") {

      return (
        <div key={key} className={"question textResponce " + corrrect}>
          <p className="prompt">{ question.prompt }</p>
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
          let answers = [];
          answers.push(MCquestions[i]);
          let not = this.state.subject.cards.indexOf(MCquestions[i]);
          let wrong = getRandom(this.state.subject.cards, 3, not);

          answers = answers.concat(wrong)
          answers = answers.sort(() => Math.random() - 0.5)

          let correctAnswer = answers.indexOf(MCquestions[i]);
          questions.push((
            <MCQuestion key={questions.length}
                        answers={answers}
                        correct={""}
                        correctAnswer={correctAnswer}
                        selected={""}></MCQuestion>
          ))
        }

        for(let i = 0; i < FRquestions.length; i++) {
          questions.push(
            frQuestion.call(this, questions.length, FRquestions[i])
          )
        }
      } else if(this.state.answerData) {
        for(let i = 0; i < this.state.answerData.length; i++) {
          if(this.state.answerData[i].type == "multipleChoice") {
            questions.push(
              <MCQuestion key={(questions.length + 1) * "-1"}
                          answers={this.state.answerData[i].answers}
                          correct={this.state.answerData[i].correct}
                          correctAnswer={this.state.answerData[i].correctAnswer}
                          selected={this.state.answerData[i].selected}>
              </MCQuestion>
            )
          }
        }
      }
      this.setState({ questionElements: questions })
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
    return answer.checked ? "correct" : "incorrect"
  }

  gradeFRquestion(element) {
    let answer = element.querySelector("textarea")
    return (answer.value === answer.name) ? "correct" : "incorrect"
  }

  gradeTest() {
    let answerData = []
    let questions = document.getElementsByClassName("question")

    for(let i = 0; i < questions.length; i++) {
      if(questions[i].classList.contains("multipleChoice")) {
        let radios = questions[i].querySelectorAll("input[type='radio']");

        let answers = Array.from(radios).map((radio) => {
          for(let i = 0; i < this.state.subject.cards.length; i++) {
            if(this.state.subject.cards[i].answer === radio.nextSibling.innerText) {
              return this.state.subject.cards[i]
            }
          }
          return ""
        });
        let selected = Array.from(radios).indexOf(Array.from(radios).filter((radio) => {
          return radio.checked
        })[0])

        let correctAnswer = Array.from(radios).indexOf(Array.from(radios).filter((radio) => {
          return radio.value === "true"
        })[0])
        console.log(answers)

        answerData.push({
          answers,
          correct: this.gradeMCquestion(questions[i]),
          correctAnswer,
          type: "multipleChoice",
          selected
        })
      } else if(questions[i].classList.contains("textResponce")) {
        answerData.push({
          index: this.state.subject.cards.indexOf(
                   this.state.subject.cards.filter(
                     card => {card.prompt === questions[i].querySelector(".prompt").innerHTML})[0]),
          correct: this.gradeFRquestion(questions[i]),
          type: "textResponce"
        })
      }
    }
    // this.setState({questionElements: document.getElementById("questions")})
    this.state.answerData = answerData
    this.setState({graded: true});

  }

  handleSubmit(event) {
    event.preventDefault();
    this.gradeTest();
    this.generateTest();
  }

  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }
    console.log("render")
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
          {!this.state.graded && (<div className="cf">
            <button className="button" type="submit">
              submit
            </button>
          </div>)}
        </form>
      </div>
    )
  }
}
