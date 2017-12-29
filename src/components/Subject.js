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
        <li className="question" key={i}>
          <p className="prompt">{ item.prompt }</p>
          <p className="answer">{ item.answer }</p>
        </li>
      )
    })
    let cardSize = "64px"
    return (
      <div id="subject">
      <h1>{ this.state.subject.name }</h1>
        <div className="info">
          <p>{this.state.subject.description}</p>
          <div className="actions">
            <Link to={"/app/subjects/" + this.state.subject.name + "/timer"}>
              <Minicard className="action"
                        size={ cardSize }
                        icon="alarm"
                        text="new timer"/>
            </Link>
            <Link to={"/app/subjects/" + this.state.subject.name + "/edit"}>
              <Minicard className="action"
                        size={ cardSize }
                        icon="edit"
                        text="edit"/>
            </Link>
            <Link to={"/app/subjects/" + this.state.subject.name + "/study"}>
              <Minicard className="action"
                        size={ cardSize }
                        icon="school"
                        text="study"/>
            </Link>
            <Link to={{
                       pathname: "/app/subjects/test/configure",
                       state: { subject: this.state.subject.name }
                     }} >
              <Minicard className="action"
                        size={ cardSize }
                        icon="assignment"
                        text="test"/>
            </Link>
            <Link to="/app/subjects/" onClick={this.deleteSelf.bind(this)}>
              <Minicard className="action"
                        size={ cardSize }
                        icon="delete_forever"
                        text="delete"/>
            </Link>

          </div>
        </div>
        <ul className="questions">
          {questions}
        </ul>
      </div>
    )
  }
}
