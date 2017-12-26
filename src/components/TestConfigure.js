import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../services/api.js"


export default class TestConfigure extends Component{
  constructor(props) {
    super(props);
    this.state = {...props.location.state,
                  questions: {
                    multipleChoice: 5,
                    textResponce: 2
                  }}
  }

  handleChange(event) {
    if(event.target.name.indexOf(".") !== -1) {
      let questions = { ...this.state.questions };
      questions[event.target.name.split(".")[1]] = event.target.value
      this.setState({ questions });
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }
  validate() {
    if(api.getAll()) {

    }
  }
  generateState() {
    return {
      questions: {
        multipleChoice: this.state.questions.multipleChoice,
        textResponce: this.state.questions.textResponce,
      }

    }
  }

  render() {
    let options = (api.getAll().map((item, i) => <option key={i} value={ item.name }>{ item.name }</option>))
    console.log(options)
    return (
      <div id="configure">
      <h1>New Test: </h1>
      <div className="selectParent option">
        <p>Subject: </p>
        <select name="subject"
                value={this.state.subject}
                onChange={this.handleChange.bind(this)} >
          { options }
        </select>
      </div>
      <div className="inputParent option">
        <p>Multiple Choice: </p>
        <input type="number"
               name="questions.multipleChoice"
               value={this.state.questions.multipleChoice}
               onChange={this.handleChange.bind(this)}
               min={0} />
      </div>
      <div className="inputParent option">
        <p>Text Responce: </p>
        <input name="questions.textResponce"
               onChange={this.handleChange.bind(this)}
               type="number"
               value={this.state.questions.textResponce}
               min={0}/>
      </div>
      <Link to={{pathname: "/app/subjects/" + this.state.subject + "/test",
                 state: this.generateState()}}>
        <button className="button">Start Test</button>
      </Link>

      </div>

    )
  }
}
