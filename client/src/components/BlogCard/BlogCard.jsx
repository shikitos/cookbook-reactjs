import { React, useState, useEffect } from 'react';
import './BlogCard.css';
import axios from 'axios';

const BlogCard = ({cardCategory}) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      .234556 
      {data ? data : ' Loading....'}
    </div>
  )
}

export default BlogCard;