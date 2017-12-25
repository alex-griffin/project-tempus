import React, { Component } from "react"

export default class Minicard extends Component {
  constructor(props) {
    super(props);
    this.state = { props }
  }
  render() {
    return (
      <div className={this.state.props.className + " minicard"}>
        <i className="material-icons" style={{fontSize: this.state.props.size}}>
          { this.state.props.icon }
        </i>
        <span>{this.state.props.text}</span>
      </div>
    )
  }
}
