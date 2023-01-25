import { React, useState, useEffect, createElement } from 'react';
import './BlogCard.css';
import axios from 'axios';

const BlogCard = ({cardCategory}) => {
  const [data, setData] = useState([{}]);
  
  useEffect(() => {
    getApiData();
  }, []);
  
  const getApiData = async () => {
    let query = "Shio Test";
    const response = await fetch(
      `http://localhost:8000/api/recipes/search/shio test`
    ).then((response) => response.json());
  
    // update the state
    setData(response);
    console.log(data);
  };

  return (
    <div>
      223232
      {data ?  <div dangerouslySetInnerHTML={{ __html: data[0].instructions }} /> : ' Loading....'}
      
    </div>
  )
}

export default BlogCard;