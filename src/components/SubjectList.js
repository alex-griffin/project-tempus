import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      filteredSubjects: []
    }
  }
  filterList(event) {

    let updatedList = this.state.subjects.filter(function(item) {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredSubjects: updatedList})
  }
  render() {

    return (
      <input type="text" placeholder="Search" onChange={this.filterList}/>

    )
  }
}
