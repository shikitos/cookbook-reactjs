import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCards.css';

const BlogCards = ({cardCategory}) => {
  const [data, setData] = useState([{}]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getApiData();
  }, []);
  
  const getApiData = async () => {
    let query = "shio test";
    const response = await fetch(
      `http://localhost:8000/api/recipes/search/${query}`
    ).then((response) => response.json());
  
    // update the state
    setData(response);
  };

  return (
    <div className='latest-content'
    
    >
      
      {/* {data ?  <div dangerouslySetInnerHTML={{ __html: data[0].instructions }} /> : ' Loading....'} */}
      {
        data ? data.map((post, index) => (
          <article id={post._id} key={index}>
            <div className='latest-content__image'>
              <img src={post.image} alt={post.name} />
            </div>
            <div className='latest-content__description'>
              <p>{post.tags}</p>
              <h2>{post.name}</h2>
              <p>{post.description}</p>
              <div className="read-more" onClick={() => navigate("/template_LINK")}>
                <span className="sm-caps">View <span className="sm-ser">the</span> Post</span>
                <svg className="svg-icon" width="20" height="20" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M32.17,20.66a1,1,0,0,1,.09,1.39L26,29.24a1,1,0,0,1-.74.34,1,1,0,0,1-.75-.35l-6.28-7.18a1,1,0,0,1,.09-1.34,1,1,0,0,1,1.39,0l5.55,6.34,5.56-6.33A1,1,0,0,1,32.17,20.66ZM40,25A15,15,0,1,1,25,10,15,15,0,0,1,40,25Zm-2,0h0A13,13,0,1,0,25,38,13.06,13.06,0,0,0,38,25Z"></path></svg>
              </div>
            </div>
            
          </article>
        
        )) : "Waiting for the data..."
        
      }
      
    </div>
  )
}

export default BlogCards;