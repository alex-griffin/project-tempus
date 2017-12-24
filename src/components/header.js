import React, { Component } from "react"
import { Link } from "react-router-dom"



export default class Header extends Component {

  render() {
    return (
      <header>
        <div id="logo"></div>

        <div className="actions">
          <button className="button">New Timer</button>
          <Link to="/app/subjects">
            <button className="button">Subjects</button>
          </Link>
        </div>
      </header>
    )
  }
}
