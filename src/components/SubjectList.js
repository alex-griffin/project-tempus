import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../services/api.js"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: api.getAll(),
      filteredSubjects: []
    }
    console.log(this.state)
  }

  filterList(event) {
    let updatedList = this.state.subjects.filter((item) => {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredSubjects: updatedList})
  }

  render() {
    return (
      <input type="text" placeholder="Search" onChange={() => this.filterList} id="subjectSearch"/>

    )
  }
}
