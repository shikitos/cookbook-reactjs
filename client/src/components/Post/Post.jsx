import React, {useState, useEffect, useRef} from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../../utils/star.svg';

const Post = (props) => {
    let navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const divRef = useRef();
  
    useEffect(() => {
        const fetchData = async () => {
            fetch(props.id ? `http://localhost:8000/api/recipes/${props.id}` : `http://localhost:8000/api/recipes/search/${props.name}`)
                .then(response => response.json())
                .then(json => setRecipe(json[0] ? json[0] : json ))
                .catch(err => console.error(err));
        };
        
          
        fetchData();
    }, []);
    
    useEffect(() => {
        if (divRef.current) updateReviewData();
    }, [divRef.current]);
    
    
    const updateReviewData = () => {
        if (recipe.review) {
            const svgArray = divRef.current.children;
            for (let i = 1; i < 6; i++) {
                const fill = i - 1 < Math.floor(recipe["review"].toFixed(2)) ? "#000" : "#fff";
                svgArray[i].children[0].children[0].children[0].style.fill = fill;
            }
        }
    }
  
    const  handleClick = (e, path) => {
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
                            className='post-image'
                            src={recipe["image"]}
                            alt={recipe["name"]}
                        />
                        <h2 className='post-heading'>
                            {recipe["name"]}
                        </h2>
                        <div className='post-reviews' ref={divRef}>
                            <p>
                                {
                                    isNaN(parseFloat(recipe.review).toFixed(2)) ?
                                    0 :
                                    parseFloat(recipe.review).toFixed(2)
                                }
                            </p>
                            {[...Array(5)].map((value, index) => (
                                <span key={index}>
                                    <Star />
                                </span>
                            ))}
                        </div>
                        { props.extended && 
                            <div>Extended</div>
                        }
                    </article>
                }
            </>
    )
}

export default Post;