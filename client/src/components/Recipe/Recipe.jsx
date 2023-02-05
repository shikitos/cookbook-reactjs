import React, { useRef, useState, useEffect } from 'react';
import "./Recipe.css";
import { useLocation } from 'react-router-dom';
import { ReactComponent as Star } from '../../utils/star.svg';

const Recipe = () => {
    const location = useLocation();
    const [recipe, setRecipe] = useState(location.state);
    const [review, setReview] = useState({
        value: 0,
        shouldBeUpdated: false,
        clickable: true
    });
    const spanRef = useRef();
    
    useEffect(() => {
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/update-review/${recipe["_id"]}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        review: review["value"]
                    })
                });
                const updatedData = await response.json();
                setRecipe({ ...recipe, review: updatedData.review });
                updateReviewData();
            } catch (error) {
                console.error(error);
            }
        };
    
        if (review["shouldBeUpdated"]) {
            setReview({ ...review, shouldBeUpdated: false });
            updateData();
        } 
        updateReviewData();
        
    }, [review, recipe]);
    
    const handleReview = (e, reviewIndex) => {
        e.preventDefault();
        if (review["clickable"]) setReview({ value: reviewIndex + 1, shouldBeUpdated: true, clickable: false });
    }
    
    const updateReviewData = () => {
        if (recipe["review"]) {
            for (let i = 0; i < 5; i++) {
                if (i < Math.floor(recipe["review"].toFixed(2))) spanRef.current.children[i].children[0].children[0].children[0].style.fill = "#000";
                else spanRef.current.children[i].children[0].children[0].children[0].style.fill = "#fff"
            }
        }
    }
    
    
    const handleHover = (e, hovered, index) => {
        for (let i = 0; i < 5; i++) {
            spanRef.current.children[i].children[0].children[0].children[0].style.fill = "#fff"
        }
        for (let i = 0; i <= index; i++) {
            if (hovered) spanRef.current.children[i].children[0].children[0].children[0].style.fill = "#000"
        }
    }

    return (
        <div className='recipe'>
            <div className='container'>
                {recipe &&
                    <>
                        <h1>{recipe.name}</h1>
                        <hr />
                        <div className='recipe-meta'>
                            <p ref = {spanRef} onMouseOut={updateReviewData}>
                                {recipe["review"] ? recipe["review"].toFixed(2) : ''}
                                {[...Array(5)].map((value, index) => (
                                    <span key={index}>
                                        <Star 
                                            onMouseOver={e => handleHover(e, true, index)}
                                            onMouseOut={e => handleHover(e, false, index)}
                                            onClick = {e => handleReview(e, index)}
                                        />
                                    </span>
                                ))}
                            </p>
                            <p>{recipe.preparationTime}</p>
                        </div>
                        <div className='recipe-description'>
                            <p>{recipe.description}</p>
                        </div>
                        <div className='recipe-image'>
                            <img src={recipe.image} alt={recipe.name} />
                        </div>
                        <div className='recipe-ingredients'>
                            <h2>ingredients</h2>
                            {recipe.ingredients.map((key, index) => (
                                <div key={index}>
                                    <input type="checkbox" name={key} />
                                    <p>{key}</p>
                                </div>
                            ))}
                        </div>
                        <div className='recipe-instructions'>
                            <h2>Instructions</h2>
                            {recipe.instructions.map((value, index) => (
                                <div key={index}>
                                    <ol>
                                        <li>
                                            <p>{value}</p>
                                        </li>
                                    </ol>
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Recipe;