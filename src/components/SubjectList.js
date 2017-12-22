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
    console.log(this.state)
  }

  filterList(event) {
    var updatedList = this.state.subjects;
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredSubjects: updatedList});
  }

  render() {
    let cards = this.state.filteredSubjects.map((e, i, arr) => {
      return (
        <SubjectCard key={i} subject={e}></SubjectCard>
      )
    })
    console.log(cards)
    return (
      <div id="subjectList">
        <input type="text" placeholder="Search" onChange={this.filterList.bind(this)} id="subjectSearch"/>
        { cards }
      </div>
    )
  }
}
