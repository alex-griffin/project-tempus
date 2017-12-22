import React, { Component } from "React"

export default class SubjectCard extends Component{
  constructor(props) {
    super(props);
    this.state.subject = props.subject
  }

  render() {
    <div>
      <h1>{this.state.subject.name}</h1>
      
    </div>
  }

}
