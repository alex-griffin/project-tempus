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
    return (
      <h1>{this.state.subject.name}</h1>
    )
  }
}
