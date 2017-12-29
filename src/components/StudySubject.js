import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import {withRouter} from "react-router"
import api from "../services/api.js"


class StudySubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: api.getName(props.match.params.subject),
      card: props.match.params.card === "finish" ? "finish" : parseInt(props.match.params.card, 10),

    }
  }
  componentWillReceiveProps(next) {
    this.setState({card: parseInt(next.match.params.card, 10)})
    this.setState({subject: api.getName(next.match.params.subject)})
  }


  render() {
    let flashCard
    if(this.state.card === "finish") {
      flashCard = (
        <h1>Finished!</h1>
      )
    } else {
      let card = this.state.subject.cards[this.state.card]
      if(!card) {
        flashCard = (
          <div className="invalid">
            <p className="sorry">
              <p className="sorry">¯\_(ツ)_/¯ <br/> invalid card number</p>

            </p>
          </div>
        )
      } else {
        flashCard = (
          <div className="flashcards">
            <div className="cardContainer">
              <div className="flashCard">
                <div className="innerCard">
                  <h1>{ card.prompt }</h1>
                </div>
              </div>
            </div>
            {/* <div className="flashCard">
              <h1>{ card.answer }</h1>
            </div> */}

          </div>

        )
      }

    }
    console.log("ss render")
    return(
      <div id="study">
        { flashCard }

        { this.state.card !== "finish" && (<footer>
          <Link to={"/app/subjects/" + this.state.subject.name + "/study/" + (this.state.card === 0 ? 0 : (this.state.card - 1)) }>
            <button className="">
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
          </Link>
          <Link to={"/app/subjects/" + this.state.subject.name + "/study/" + ((this.state.card + 1 >= this.state.subject.cards.length) ? "finish" : (this.state.card + 1)) }>
            <button className="">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </Link>
        </footer>)}
      </div>
    )
  }
}

export default withRouter(StudySubject)
