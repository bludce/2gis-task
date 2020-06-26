import React from 'react';
import PropTypes from 'prop-types';

import './List.sass'

import Item from '../Item/Item'

const List = ({ books, setInProgress, setInDone, setReturnToRead, inProgress, done, setFilters }) => {

  const {items = []} = books

  const booksItems = items.map((book) => {
    return (
      <Item
        key={book.id}
        id={book.id}
        author={book.author}
        title={book.title}
        description={book.description}
        tags={book.tags}
        setInProgress={setInProgress}
        setInDone={setInDone}
        setReturnToRead={setReturnToRead}
        inProgress={inProgress}
        done={done}
        setFilters={setFilters}
      />
    )
  });

  return (
    <div className="book-list">{booksItems.length ? booksItems : <div className="empty">List is empty</div>}</div>
  );

}

List.propTypes = {
  books: PropTypes.object, 
  setInProgress: PropTypes.func, 
  setInDone: PropTypes.func, 
  setReturnToRead: PropTypes.func, 
  inProgress: PropTypes.bool, 
  done: PropTypes.bool, 
  setFilters: PropTypes.func,
}

List.defaultProps = {
  books: {}, 
  setInProgress: () => {}, 
  setInDone: () => {},
  setReturnToRead: () => {},
  inProgress: false, 
  done: false, 
  setFilters: () => {},
}

export default List;