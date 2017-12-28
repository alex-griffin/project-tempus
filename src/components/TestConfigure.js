import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import InfoPopup from "./InfoPopup.js"
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
    this.setState({error: false})

  }
  validate() {
    if(api.getName(this.state.subject).cards.length < parseInt(this.state.questions.multipleChoice, 10) + parseInt(this.state.questions.textResponce, 10)) {
      this.setState({error: "you must have a total question number less than or equal to the number of questions in the subject"})
    } else if(this.state.questions.multipleChoice + this.state.questions.textResponce <= 0) {
      this.setState({error: "you must have some number of questions"})
    } else {
      this.setState({error: false})
      this.generateState();
      this.setState({redirect: true})
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
    if(this.state.redirect) {
      return (
        <Redirect to={{pathname: "/app/subjects/" + this.state.subject + "/test",
                       state: this.generateState()}}></Redirect>
      )
    }
    let error;
    if(this.state.error) {
      error = (
        <InfoPopup key={Math.random()}
                   className="error"
                   show={ true }
                   message={this.state.error}></InfoPopup>
      )
    }
    return (
      <div id="configure">
      {error}
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

        <button className="button" onClick={this.validate.bind(this)}>Start Test</button>

      </div>

    )
  }
}
