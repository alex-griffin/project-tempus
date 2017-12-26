import React, { Component } from "react"
import { Link } from "react-router-dom"
import SubjectCard from "./SubjectCard.js"
import api from "../services/api.js"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: api.getAll(),
      get filteredSubjects() {return this.subjects},
      showPlaceHolder: true,
      focused: false
    }
  }

  filterList(event) {
    let updatedList = this.state.subjects;
    updatedList = updatedList.filter((e) => {
      return(e.name.indexOf(event.target.value) !== -1)
    });
    this.setState({filteredSubjects: updatedList})
    if(event.target.value.length === 0) {
      this.setState({showPlaceHolder: true})
    } else {
      this.setState({showPlaceHolder: false})
    }

  }

  handleFocus(t) {
    if(t) {
      this.setState({focused: true});
    } else {
      this.setState({focused: false});
      this.setState({showPlaceHolder: true})
    }
  }

  render() {
    let cards = this.state.filteredSubjects.map((e, i, arr) => {
      return (
        <SubjectCard key={i} subject={e}></SubjectCard>
      )
    })
    return (
        <div id="subjectList">
          <div className={"subjectSearchInput " + (this.state.focused ? "focused" : "")}>
            <p style={{display: this.state.showPlaceHolder ? "inline-block" : "none"}}>
              <i className="material-icons">search</i>
              <span>Search</span>
            </p>
            <input type="text"
                   onChange={this.filterList.bind(this)}
                   onFocus={() => {this.handleFocus(true)}}
                   onBlur={() => {this.handleFocus(false)}}
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
