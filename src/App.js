import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./components/header.js"
import NotFound from "./components/notFound.js"
import Home from "./components/home.js"
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
              <Route path="*" component={ NotFound } />
            </Switch>
          </main>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
