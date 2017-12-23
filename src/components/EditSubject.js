import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class EditSubject extends Component{
  constructor(props) {
    super(props)
    this.state = {
      subject: api.getName(props.match.params.subject) || api.getNewSubject(),
      prevSubject: !!(api.getName(props.match.params.subject))
    }

  }

  saveAll(e) {
    if(document.getElementById("editName").value) {
      let name = "";
      if(this.state.prevSubject) { name = this.state.subjectName }

      this.state.subject.name = document.getElementById("editName").value;
      this.state.subject.description = document.getElementById("editDescription").value;

      if(name) {
        api.setSubject(name, this.state.subject);
      } else {
        api.setSubject(this.state.subject.name, this.state.subject);
      }
      api.saveLocalSorage();
    }
  }

  render() {
    return (
      <div id="edit">

        <div className="edit editName">
          <p>Name: </p>
          <input id="editName" type="text" className="h1" defaultValue={this.state.subject.name}/>
        </div>
        <div className="edit">
          <p>Description: </p>
          <textarea id="editDescription" placeholder="description" defaultValue={this.state.subject.description}></textarea>
        </div>
        <button className="button">Import</button>
        <button className="button">Export</button>
        <Link to={"/app/subjects/" + this.state.subject.name}>
          <button className="button" onClick={this.saveAll.bind(this)}>Save</button>
        </Link>
        <Link to={"/app/subjects/" + this.state.subject.name}>
          <button className="button">Discard</button>
        </Link>
      </div>
    )
  }
}
