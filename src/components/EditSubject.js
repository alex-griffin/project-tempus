import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "../services/api.js"


export default class EditSubject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: api.getName(props.match.params.subject) || api.getNewSubject(),
      prevSubject: !!(api.getName(props.match.params.subject))
    }
    this.num = 0;
  }

  saveAll(e) {
    if(document.getElementById("editName").value) {
      let name = "";
      if(this.state.prevSubject) { name = this.state.subject.name }
      let subject = { ...this.state.subject };

      subject.name = document.getElementById("editName").value;
      subject.description = document.getElementById("editDescription").value;

      let newQElements = document.getElementsByClassName("card");
      let prevCards = subject.cards;
      subject.cards = [];
      let newQs = [];

      for(let i = 0; i < newQElements.length; i++) {
        if(newQElements[i].children[0].value && newQElements[i].children[2].value) {

          newQs.push(api.getNewCard(newQElements[i].children[0].value,
                                    newQElements[i].children[2].value));

          let index = newQs.length - 1;

          let prevCard = prevCards.filter((item) => {
            return (item.prompt === newQs[index].prompt &&
                    item.answer === newQs[index].answer)
          })

          if(prevCard) {
            newQs[index] = prevCard[0];
          }
        }
      }
      console.log(newQs)
      subject.cards = newQs;

      if(name) {
        api.setSubject(name, subject);
      } else {
        api.setSubject(subject.name, subject);
      }
      this.setState({subject})
      api.saveLocalSorage();
    } else {
      alert("your subject needs a name")
    }

  }


  addCard() {
    this.saveAll();
    let subject = {...this.state.subject};
    subject.cards.push(api.getNewCard("question", "answer"))
    this.setState({subject});
  }

  removeCard(i) {
    this.saveAll();
    let subject = {...this.state.subject};
    subject.cards = subject.cards.filter((_, index) => i != index);
    console.log(subject.cards)
    this.setState({subject});
  }

  render() {
    let cards = [];
    cards = this.state.subject.cards.map((item, i) => {
      return (
        <div key={i + this.num} className="card">
          <input type="text" className="prompt" defaultValue={item.prompt} ref={(input) => this.input = input} />
          <span>:</span>
          <input type="text" className="answer" defaultValue={item.answer} ref={(input) => this.input = input} />
          <button className="remove" onClick={() => this.removeCard(i)}>X</button>
        </div>
      )
    });
    this.num += cards.length
    return (
      <div id="edit">

        <div className="edit editName">
          <p>Name: </p>
          <input id="editName" type="text" className="h1" defaultValue={this.state.subject.name}/>
        </div>
        <div className="edit">
          <p>Description: </p>
          <textarea id="editDescription" placeholder="description" defaultValue={this.state.subject.description}></textarea>
        </div>
        { cards }
        <div className="buttons">
          <button className="add" onClick={this.addCard.bind(this)}>+</button>
        </div>
        <div className="buttons">


          <button className="button">Import</button>
          <button className="button">Export</button>
            <button className="button" onClick={this.saveAll.bind(this)}>Save</button>
          <Link to={"/app/subjects/" + this.state.subject.name}>
            <button className="button">Back</button>
          </Link>
        </div>

      </div>
    )
  }
}
