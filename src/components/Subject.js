import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class Subject extends Component{
  constructor(props) {
    super(props);
    this.state = {
      subject: api.getName(props.match.params.subject)
    }
  }

  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }
    let questions = this.state.subject.cards.map((item, i) => {
      return (
        <li key={i}>
          <span className="prompt">{item.prompt}</span>
          <span className="answer">{item.answer}</span>
        </li>
      )
    })
    return (
      <div id="subject">
        <h1>{this.state.subject.name}</h1>

        <ul>
          {questions}
        </ul>
      </div>
    )
  }
}
