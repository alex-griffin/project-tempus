import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Minicard from "./MiniCard.js"
import api from "../services/api.js"


export default class Subject extends Component{
  constructor(props) {
    super(props);
    this.state = {
      subject: api.getName(props.match.params.subject)
    }
  }

  deleteSelf() {
    console.log("deleteing")
    api.deleteName(this.state.subject.name)
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
          <span className="prompt">{ item.prompt }</span>
          <span className="answer">{ item.answer }</span>
        </li>
      )
    })
    return (
      <div id="subject">
      <h1>{ this.state.subject.name }</h1>
        <div className="info">
          <p>{this.state.subject.description}</p>
          <div className="actions">
            <Link to={"/app/subjects/" + this.state.subject.name + "/timer"}>
              <Minicard className="action"
                        size="100px"
                        src="http://www.free-icons-download.net/images/timer-icon-71783.png"
                        text="new timer"/>
            </Link>
            <Link to={"/app/subjects/" + this.state.subject.name + "/edit"}>
              <Minicard className="action"
                        size="100px"
                        src="https://d30y9cdsu7xlg0.cloudfront.net/png/347-200.png"
                        text="edit"/>
            </Link>
            <Link to="/app/subjects/" onClick={this.deleteSelf.bind(this)}>
              <Minicard className="action"
                        size="100px"
                        src="http://www.pvhc.net/img19/kjugwpyxdoamxrjkckrs.png"
                        text="delete"/>
            </Link>
          </div>
        </div>
        <ul>
          {questions}
        </ul>
      </div>
    )
  }
}
