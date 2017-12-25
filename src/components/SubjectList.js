import React, { Component } from "react"
import { Link } from "react-router-dom"
import SubjectCard from "./SubjectCard.js"
import api from "../services/api.js"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: api.getAll(),
      get filteredSubjects() {return this.subjects}
    }
  }

  filterList(event) {
    let updatedList = this.state.subjects;
    updatedList = updatedList.filter((e) => {
      return(e.name.indexOf(event.target.value) !== -1)
    });
    this.setState({filteredSubjects: updatedList})
  }

  render() {
    let cards = this.state.filteredSubjects.map((e, i, arr) => {
      return (
          <SubjectCard key={i} subject={e}></SubjectCard>
      )
    })
    return (
        <div id="subjectList">
          <div className="subjectSearchInput">
            <p><i class="material-icons">search</i> Search</p>
            <input type="text"
                   placeholder=""
                   onChange={this.filterList.bind(this)}
                   id="subjectSearch" />
          </div>

        { cards }
        <div className="subjectCard">
          <Link to="/app/subjects/new/">
            <h1>Create new subject</h1>
          </Link>
        </div>

      </div>
    )
  }
}
