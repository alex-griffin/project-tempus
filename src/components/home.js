import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Home extends Component {

  render() {
    return (
      <Link to="/app/">
        <button className="button">Go To App</button>

        {/*TODO: make a home page*/}
      </Link>
    )
  }
}
