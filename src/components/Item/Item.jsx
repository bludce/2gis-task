import React from 'react';
import './Item.sass'

const RepoItem = ({ id, author, title, description, tags, setInProgress, setInDone, setReturnToRead }) => {

  return (
    <div className="book-list__item item">
      <div className="item__author">{author}</div>

      <div className="item__content">
        <div className="item__title">
          {title}
        </div>
        <div className="btn" onClick={()=>setInProgress({id, author, title, description, tags})}>Start Reading</div>
        <div className="btn" onClick={()=>setInDone({id, author, title, description, tags})}>Finish reading</div>
        <div className="btn" onClick={()=>setReturnToRead({id, author, title, description, tags})}>Return in to read</div>
      </div>

      <div className="item__description">{description}</div>
      <div className="item__tags">{tags.map((tag) => {
        return <span className="item__tag" key={tag}>{tag}</span>
      })}</div>
      
      
    </div>
  );
}

export default RepoItem