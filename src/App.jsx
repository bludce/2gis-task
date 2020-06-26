import React, { PureComponent, Fragment } from 'react';
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
    activeFilter: '',
    filters: []
  }

  componentDidMount = async() => {
    const booksLocal = localStorage.getItem('books') !== null ? JSON.parse(localStorage.getItem('books')) : {};
    const inProgressLocal = localStorage.getItem('inProgress') !== null ? JSON.parse(localStorage.getItem('inProgress')) : {};
    const doneLocal = localStorage.getItem('done') !== null ? JSON.parse(localStorage.getItem('done')) : {};
    const activeFilterLocal = localStorage.getItem('activeFilter') !== null ? JSON.parse(localStorage.getItem('activeFilter')) : '';
    const filtersLocal = localStorage.getItem('filters') !== null ? JSON.parse(localStorage.getItem('filters')) : [];

    if (localStorage.getItem('books') !== null 
        && localStorage.getItem('inProgress') !== null 
        && localStorage.getItem('done') !== null 
        && localStorage.getItem('activeFilter') !== null
        && localStorage.getItem('filters') !== null) {
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
        activeFilter: activeFilterLocal,
        filters: filtersLocal
      })
    } else {
      await this.loadPage('https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json')
    }    
  }

  componentDidUpdate = () => {
    const {books, inProgress, done, activeFilter, filters} = this.state

    localStorage.setItem('books', JSON.stringify(books.items));
    localStorage.setItem('inProgress', JSON.stringify(inProgress.items));
    localStorage.setItem('done', JSON.stringify(done.items));
    localStorage.setItem('activeFilter', JSON.stringify(activeFilter));
    localStorage.setItem('filters', JSON.stringify(filters));
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

  filterBooks = (activeFilter) => {
    switch(activeFilter) {
      case 'inProgress':
        return this.state.inProgress;
        break;
      case 'done':
        return this.state.done;
        break;
      default:
        return this.state.books
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

  setFilters = (name) => {
    const {filters, activeFilter } = this.state

    this.setState({
      filters: Array.from(new Set([...filters, name]))
    })

    let books = this.filterBooks(activeFilter)
    let arr = books.items.filter((book) => book.tags.some((el) => {
      return filters.includes(el)
    }) )   
  }


  clear = () => {
    this.setState({
      filters: []
    })
  }

  render() {

    const {books, inProgress, done, activeFilter, filters} = this.state

    const filteredBooks = this.filterBooks(activeFilter)

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
          {filters.length ?
            <div className="filters-wrap">
              <div className="filters">
                {filters.map((tag) => {
                  return <span className="item__tag" key={tag}>{tag}</span>
                })}
              </div>
              <div className="clear" onClick={this.clear}>clear</div>
            </div>
            : ''
          }
          <div className="tabs__content">
            <Switch>
              <Route path='/' exact render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead}
                      setFilters={this.setFilters}
                    />
              }/>
              <Route path='/inprogress' render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead} 
                      inProgress={true}
                      setFilters={this.setFilters}
                    />
              }/>
              <Route path='/done' render={
                ()=><List 
                      books={filteredBooks} 
                      setInProgress={this.setInProgress} 
                      setInDone={this.setInDone} 
                      setReturnToRead={this.setReturnToRead} 
                      done={true}
                      setFilters={this.setFilters}
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