import React, { Component } from "react"


export default class InfoPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }

  toggleShow() {
    this.setState((prev) => {return {show: !prev.show}})
  }

  render() {
    return (
      <div className={"popup " + (this.state.show ? "show " : "hide ") + this.state.className}>
        <p>{this.state.message}</p>
        <button onClick={this.toggleShow.bind(this)}><i className="material-icons">close</i></button>
      </div>
    )
  }
}
