import React, { Component } from "react"


export default class Sorry extends Component {
  render() {
    return (
      <p className="sorry">
        ¯\_(ツ)_/¯
        <br/>
        { this.props.children }
      </p>
    )
  }
}
