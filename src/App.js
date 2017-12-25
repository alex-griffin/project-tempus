import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from "./components/Header.js"
import NotFound from "./components/NotFound.js"
import Home from "./components/Home.js"
import SubjectList from "./components/SubjectList.js"
import Subject from "./components/Subject.js"
import EditSubject from "./components/EditSubject.js"
import SubjectTest from "./components/SubjectTest.js"
import TestConfigure from "./components/TestConfigure.js"
import api from "./services/api.js"
import "./style/index.css"

api.getAll();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <main>
            <Switch>
              <Route path="/" exact component={ Home } />
              <Route path="/app/" exact render={() => (
                <Redirect to="/app/subjects"></Redirect>
              )} />
              <Route path="/app/subjects" exact component={ SubjectList } />
              <Route path="/app/subjects/new" exact component={ EditSubject } />
              <Route path="/app/subjects/:subject/edit" exact component={ EditSubject } />
              <Route path="/app/subjects/test/configure" component={ TestConfigure } />
              <Route path="/app/subjects/:subject/test/:testType&:num" component={ SubjectTest } />

              <Route path="/app/subjects/:subject" component={ Subject } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </main>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
