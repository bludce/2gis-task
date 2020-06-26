import React from 'react';
import './Item.sass'

const RepoItem = ({ id, author, title, description, tags, setInProgress, setInDone, setReturnToRead, inProgress, done, setFilters }) => {
  return (
    <div className="book-list__item item">
      <div className="item__author">{author}</div>

      <div className="item__content">
        <div className="item__title">
          {title}
        </div>
        {!inProgress && !done ? <div className="btn" onClick={()=>setInProgress({id, author, title, description, tags})}>Start Reading</div> :''}
        {inProgress ? <div className="btn" onClick={()=>setInDone({id, author, title, description, tags})}>Finish reading</div> : ''}
        {done ? <div className="btn" onClick={()=>setReturnToRead({id, author, title, description, tags})}>Return in to read</div>: ''}
      </div>

      <div className="item__description">{description}</div>
      <div className="item__tags">{tags.map((tag) => {
        return <span className="item__tag" onClick={() => setFilters(tag)} key={tag}>{tag}</span>
      })}</div>
      
      
    </div>
  );
}

export default RepoItem