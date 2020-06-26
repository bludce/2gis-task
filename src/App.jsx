import React, { PureComponent } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import './index.sass';

import List from './components/List/List'

class App extends PureComponent {

  state = {
    books: {
      items: []
    },
    inProgress: {
      items: []
    },
    done: {
      items: []
    },
    activeFilter: ''
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

  filterBooks = (books, activeFilter) => {
    switch(activeFilter) {
      case 'inProgress':
        return this.state.inProgress;
        break;
      case 'done':
        return this.state.done;
        break;
      default:
        return books
    }
  }

  setActiveFilter = (activeFilter) => {
    this.setState({
      activeFilter
    })
  }

  setInProgress = (book) => {
    const {items} = this.state.inProgress

    this.setState({
      inProgress: {
        items: [...items, book]
      }
    })

    this.setState({
      books: {
        items: this.state.books.items.filter(item => item.id !== book.id)
      }
    })
  }

  setInDone = (book) => {
    const {items} = this.state.done
    
    this.setState({
      done: {
        items: [...items, book]
      }
    })

    this.setState({
      inProgress: {
        items: this.state.inProgress.items.filter(item => item.id !== book.id)
      }
    })
  }

  setReturnToRead = (book) => {
    const {items} = this.state.books

    this.setState({
      books: {
        items: [...items, book]
      }
    })

    this.setState({
      done: {
        items: this.state.done.items.filter(item => item.id !== book.id)
      }
    })
  }

  render() {

    const {books, inProgress, done, activeFilter} = this.state

    const filteredBooks = this.filterBooks(books, activeFilter)

    const lenghtBooks = books.items.length
    const lenghtInProgressBooks = inProgress.items.length
    const lenghtInDoneBooks = done.items.length

    return (
      <BrowserRouter>
        <div className="tabs container">
          <div className="tabs__links">
            <NavLink to={`/`} className="tabs__link" onClick={()=>this.setActiveFilter('')}>To read ({lenghtBooks})</NavLink>
            <NavLink to={`/inprogress`} className="tabs__link" onClick={()=>this.setActiveFilter('inProgress')}>In progress ({lenghtInProgressBooks})</NavLink>
            <NavLink to={`/done`} className="tabs__link" onClick={()=>this.setActiveFilter('done')}>Done ({lenghtInDoneBooks})</NavLink>
          </div>
          
          <div className="tabs__content">
            <Switch>
              <Route path='/' exact render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead}
                    />
              }/>
              <Route path='/inprogress' render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead} 
                      inProgress={true}
                    />
              }/>
              <Route path='/done' render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead} 
                      done={true}
                    />
              }/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;