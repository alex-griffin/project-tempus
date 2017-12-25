import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
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
    let questions = [];
    for(let i = 0; i < this.state.questions.multipleChoice; i++) {
      let questionI = Math.floor(Math.random() * this.state.subject.cards.length)
      let question = this.state.subject.cards[questionI]
      let wrong = this.state.subject.cards.reduce((w, c, i) => {
        if(i !== questionI && w.length < 3) {
          w.push(c)
        }
      }, []);

      questions = wrong.map((item) => {
        <div className="question multipleChoice">
          <div className="radio">
            <label>
              <input name={question} value={item.answer} type="radio"/>
            </label>
          </div>
        </div>
      })

      questions.push((
        <div className="question multipleChoice">
          <div className="radio">
            <label>
              <input name={question} value={question.answer} type="radio"/>
            </label>
          </div>
        </div>
      ))

    }
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
          {this.generateTest()}
        </form>


      </div>
    )
  }
}
