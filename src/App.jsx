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

  componentDidMount = async() => {
    const booksLocal = localStorage.getItem('books') !== null ? JSON.parse(localStorage.getItem('books')) : {};
    const inProgressLocal = localStorage.getItem('inProgress') !== null ? JSON.parse(localStorage.getItem('inProgress')) : {};
    const doneLocal = localStorage.getItem('done') !== null ? JSON.parse(localStorage.getItem('done')) : {};
    const activeFilterLocal = localStorage.getItem('activeFilter') !== null ? JSON.parse(localStorage.getItem('activeFilter')) : {};

    if (localStorage.getItem('books') !== null 
        && localStorage.getItem('inProgress') !== null 
        && localStorage.getItem('done') !== null 
        && localStorage.getItem('activeFilter') !== null) {
      this.setState({
        books: {
          items: booksLocal
        },
        inProgress: {
          items: inProgressLocal
        },
        done: {
          items: doneLocal
        },
        activeFilter: activeFilterLocal
      })
    } else {
      await this.loadPage('https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json')
    }    
  }

  componentDidUpdate = () => {
    const {books, inProgress, done, activeFilter} = this.state

    localStorage.setItem('books', JSON.stringify(books.items));
    localStorage.setItem('inProgress', JSON.stringify(inProgress.items));
    localStorage.setItem('done', JSON.stringify(done.items));
    localStorage.setItem('activeFilter', JSON.stringify(activeFilter));
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

    const {books, inProgress, done, activeFilter} = this.state

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
            <NavLink 
              to={`/`} 
              className="tabs__link" 
              onClick={()=>this.setActiveFilter('')}
              activeClassName="tabs__link--active"
              exact
            >
              To read ({lenghtBooks})
            </NavLink>
            <NavLink 
              to={`/inprogress`} 
              className="tabs__link" 
              onClick={()=>this.setActiveFilter('inProgress')}
              activeClassName="tabs__link--active"
              exact
            >
              In progress ({lenghtInProgressBooks})
            </NavLink>
            <NavLink 
              to={`/done`} 
              className="tabs__link" 
              onClick={()=>this.setActiveFilter('done')}
              activeClassName="tabs__link--active"
              exact
            >
              Done ({lenghtInDoneBooks})
            </NavLink>
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