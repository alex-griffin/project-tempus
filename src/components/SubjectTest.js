import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class SubjectTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: api.getName(props.match.params.subject) || api.getNewSubject(),
      testType: props.match.params.testType,
      questions: props.match.params.num
    }
  }

  generateMCTest() {

  }

  render() {
    if(!this.state.subject) {
      return(
        <Redirect to="/app/subjects"></Redirect>
      )
    }

    let test;

    if(this.state.testType === "mChoice") {
      test = this.generateMCTest();
    }
    return (
      <h1>{ this.state.subject.name }</h1>



    )
  }
}
