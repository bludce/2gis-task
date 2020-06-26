import React from 'react';
import './Item.sass'

const RepoItem = ({ id, author, title, description, tags }) => {

  return (
    <div className="book-list__item item">
      <div className="item__author">{author}</div>
      <div className="item__title">
        {title}
      </div>
      <div className="item__content">
        <div className="item__description">{description}</div>
        <div className="item__tags">{tags.map((tag) => {
          return <span className="item__tag" key={tag}>{tag}</span>
        })}</div>
      </div>
      
    </div>
  );
}

export default RepoItem