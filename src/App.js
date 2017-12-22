import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from "./components/Header.js"
import NotFound from "./components/NotFound.js"
import Home from "./components/Home.js"
import SubjectList from "./components/SubjectList.js"
import "./style/index.css"



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
              <Route path="/app/subjects" component={ SubjectList } />

              <Route path="*" component={ NotFound } />
            </Switch>
          </main>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
