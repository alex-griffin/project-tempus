import React, { Component } from "react"



export default class Header extends Component {

  render() {
    return (
      <header>
        <div id="logo"></div>

        <button className="button">New Timer</button>
      </header>
    )
  }
}
