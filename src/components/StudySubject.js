import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class StudySubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: api.getName(props.match.params.subject),
      card: props.match.params.card,

    }
  }

  render() {
    let flashCard
    if(this.state.card === "finish") {
      flashCard = (
        <h1>Finished!</h1>
      )
    } else {
      let card = this.state.subject.cards[this.state.card]
      flashCard = (
        <div className="flashCard">
          <h1>{ card.prompt }</h1>
          <h1>{ card.answer }</h1>

        </div>
      )
    }
    console.log(this.state.card)
    return(
      <div id="study">
        <h1>hi + {this.state.card}</h1>
        { flashCard }
      </div>
    )
  }
}
