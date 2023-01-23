import React from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';

const Post = ({title, imagePath, postUrl}) => {
  let navigate = useNavigate();
  
  function handleClick(e, path) {
    e.preventDefault();
    navigate(path);
  }

  return (
    <article 
      onClick={(e) => handleClick(e, `${postUrl}`)}
      className='post-card'
    >
      <img 
        src={imagePath}
        alt={title}
      />
      <h2>{title}</h2>
      <span></span>
    </article>
  )
}

export default Post;