import React from 'react';
import './List.sass'

import Item from '../Item/Item'

const List = ({ books }) => {
  
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
      />
    )
  });

  return (
    <div className="book-list">{booksItems}</div>
  );

}

export default List;