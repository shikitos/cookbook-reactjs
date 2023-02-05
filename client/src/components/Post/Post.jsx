import React, {useState, useEffect} from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
    let navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/recipes/search/${props.name}`);
            const data = await response.json();
            setRecipe(data[0]);
        };
          
        fetchData();
    }, []);
  
    function handleClick(e, path) {
        e.preventDefault();
        console.log(path);
        navigate(path, {state: recipe});
    }

    return (
            <>
                {recipe &&
                    <article 
                        onClick={(e) => handleClick(e, `/${recipe.urlIdName}`)}
                        className={`post-card ${recipe["_id"]}`}
                    >
                        <img 
                            src={recipe.image}
                            alt={recipe.name}
                        />
                        <h2>{recipe.name}</h2>
                        <span></span>
                    </article>
                }
            </>
    )
}

export default Post;