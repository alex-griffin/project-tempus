import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Minicard from "./MiniCard.js"
import api from "../services/api.js"


export default class TestConfigure extends Component{
  constructor(props) {
    super(props);
    this.state = {...props.location.state}

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }



  render() {
    console.log(this.state);
    console.log(this);
    console.log(this.location);
    let options = api.getAll().map((item, i) => <option key={i} value={ item.name }>{ item.name }</option>)
    return (
      <div id="configure">
      <h1>New Test: </h1>
      <div className="selectParent input">
        <p>Subject: </p>
        <select name="subject" value={this.state.subject}>
          { options }
        </select>
      </div>
      <div className="inputParent input">
        <p>Multiple Choice: </p>
        <input name="questionNumber" type="number"/>
      </div>
      <Link to={"app/test/" + this.state.subject + "/" +
                              this.state.type + "&" +
                              this.state.questionNumber}>
        <button className="button">Start Test</button>
      </Link>

      </div>

    )
  }
}
