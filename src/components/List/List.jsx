import React from 'react';
import './List.sass'

import Item from '../Item/Item'

const List = ({ books, setInProgress, setInDone, setReturnToRead, inProgress, done }) => {

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
      />
    )
  });

  return (
    <div className="book-list">{booksItems.length ? booksItems : <div className="empty">List is empty</div>}</div>
  );

}

export default List;