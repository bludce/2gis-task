import React, { PureComponent } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import './index.sass';

import List from './components/List/List'

class App extends PureComponent {

  state = {
    books: {}
  }

  componentDidMount = () => {
    this.loadPage('https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json')
  }

  loadPage = async (url) => {
    try {
    
      let response = await fetch(url);
      let books = await response.json();
      this.setState({
        books,
      })
    }
    catch(e) {
      alert("Ошибка")
    }
  }

  render() {

    const {books} = this.state

    return (
      <BrowserRouter>
        <div className="tabs container">
          <div className="tabs__links">
            <NavLink to={`/`} className="tabs__link">To read</NavLink>
            <NavLink to={`?tab=inprogress`} className="tabs__link" >In progress</NavLink>
            <NavLink to={`?tab=done`} className="tabs__link">Done</NavLink>
          </div>
          
          <div className="tabs__content">
            <Switch>
              <Route path='/' exact render={
                ()=><List books={books}/>
              }/>
              <Route path='?tab=inprogress' render={
                ()=><List books={books}/>
              }/>
              <Route path='?tab=done`' render={
                ()=><List books={books}/>
              }/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;