import React, { Component } from "react"
import { Link } from "react-router-dom"
import horse from "../assets/img/horse.svg"


export default class NotFound extends Component {
  constructor(props) {
    super(props);
    let defaultTime = 400;
    this.state = {
      index: -1,
      wordList: [{text: "Hello ladies",
                  time: defaultTime},
                 {text: "look at your url",
                  time: defaultTime},
                 {text: "now back at me",
                  time: defaultTime},
                 {text: "now back at your url",
                  time: defaultTime},
                 {text: "now back to me",
                  time: defaultTime},
                 {text: "sadly he isn't real",
                  time: defaultTime},
                 {text: "but if he stopped pointing to non-existant things and switched to old spice he could smell like he's me",
                  time: 2000},
                 {text: "look down",
                  time: defaultTime},
                 {text: "back up",
                  time: defaultTime},
                 {text: "where are you?",
                  time: defaultTime},
                 {text: "you're at a poorly done 404 page with the url your url could smell like",
                  time: 1500},
                 {text: "what's in your hand",
                  time: defaultTime},
                 {text: "back at me",
                  time: defaultTime},
                 {text: "I have it",
                  time: defaultTime},
                 {text: "it's a link that points to that thing you wanted",
                  time: 600},
                 {text: "look again",
                  time: defaultTime},
                 {text: "the link now goes to /app/subject/",
                  time: 600},
                 {text: "anything is possible when your url smells like old spice and not a lady",
                  time: 1500},
                 {text: "i'm on a horse",
                  time: defaultTime}],

    }

  }
  componentDidMount() {
    this.interval = setInterval(
      () => {this.updateIndex()}, 400
    )
    document.body.className = 'ofh'


  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
    document.body.className = ''



  }
  updateIndex() {
    if(this.state.index + 1 <= this.state.wordList.length - 1) {
      this.setState((prev) => {
        return { index: prev.index + 1}
      })
      clearInterval(this.interval)
      this.interval = this.interval = setInterval(
        () => {this.updateIndex()}, this.state.wordList[this.state.index].time
      )
    } else {
      clearInterval(this.interval);
      document.getElementById("horse").classList.add("show")
    }

  }

  render() {
    return (
      <div className="notfound">
        <h1>
          { this.state.index >= 0 ? this.state.wordList[this.state.index].text : "" }
        </h1>
        <button className="button">
          <Link to="/app/subjects/">
              Subjects
          </Link>
        </button>

        <img id="horse" src={ horse } alt=""/>
      </div>
    )
  }
}
