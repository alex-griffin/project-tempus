import React, { Component } from "react"

export default class Minicard extends Component {
  constructor(props) {
    super(props);
    this.state = { props }
  }
  render() {
    return (
      <div className={this.state.props.className + " minicard"}>
        <img style={{height: this.state.props.size, width: this.state.props.size}}
             src={this.state.props.src}/>
        <span>{this.state.props.text}</span>
      </div>
    )
  }
}
