import React, { useRef, useState, useEffect } from 'react';
import "./Recipe.css";
import { useLocation, Navigate } from 'react-router-dom';
import { ReactComponent as Star } from '../../utils/star.svg';
import { ReactComponent as PreparationTime } from '../../utils/preparationTime.svg';
import { RecipeWidget } from '../';

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
            console.log("Value review", review["value"])
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
        
        if (recipe) updateReviewData();
        
    }, [review, recipe]);
    
    const handleReview = (e, reviewIndex) => {
        e.preventDefault();
        if (review["clickable"]) setReview({ value: reviewIndex + 1, shouldBeUpdated: true, clickable: false });
    }
    
    const updateReviewData = () => {
        if (!spanRef.current) return;
        if (recipe["review"] || recipe.review) {
            const svgArray = spanRef.current.children;
            for (let i = 0; i < 5; i++) {
                const fill = i < Math.floor(recipe["review"].toFixed(2)) ? "#000" : "#fff";
                svgArray[i].children[0].children[0].children[0].style.fill = fill;
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
            <div className='container recipe-container'>
                {recipe ?
                    <>
                        <main>
                            <h1>{recipe.name}</h1>
                            <div className='recipe-meta'>
                                <div className='recipe-meta__review-container' onMouseOut={updateReviewData}>
                                    <span className='recipe-meta__review-value'>{recipe["review"] ? recipe["review"].toFixed(2) : ''}</span>
                                    <div className='recipe-meta__review-svg' ref = {spanRef}>
                                        {[...Array(5)].map((value, index) => (
                                            <span key={"star-"+index}>
                                                <Star 
                                                    onMouseOver={e => handleHover(e, true, index)}
                                                    onMouseOut={e => handleHover(e, false, index)}
                                                    onClick = {e => handleReview(e, index)}
                                                    key={"svg-"+index}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='recipe-meta__preparation-time'>
                                    <PreparationTime />
                                    <span>{recipe.preparationTime ? recipe.preparationTime : "N / A"}</span>
                                </div>
                            </div>
                            <div className='recipe-description'>
                                <p><em>{recipe.description}</em></p>
                            </div>
                            <figure className='recipe-image'>
                                <img src={recipe.image} alt={recipe.name} />
                            </figure>
                            <div className='recipe-instructions'>
                                {recipe.howToStep.map((value, index) => (
                                        <div key={"howtostep-"+index} className={`recipe-instructions__container ${index}`} dangerouslySetInnerHTML={{__html: value}} />
                                ))}
                            </div>
                            <div className='recipe-ingredients'>
                                <h2>Ingredients <div className="recipe__decoration-line"></div></h2>
                                <ul className='recipe-ingredients__list'>
                                    {recipe.ingredients.map((key, index) => (
                                        <React.Fragment key={"ingredients-"+index}>
                                            {
                                                key.includes('HHH') ?
                                                <h3 key={"list-ingredient-title-"+index}>{key.split("HHH")}</h3>
                                                :
                                                <li key={"list-ingredient-item-"+index}>
                                                    <span className='recipe-ingredients__checkbox-container'>
                                                        <input type="checkbox" name={key} />
                                                    </span>
                                                    <div className={`recipe-instructions__container ${index}`}>
                                                        <span dangerouslySetInnerHTML={{__html: key}} />
                                                    </div>
                                                </li>
                                            }
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </div>
                            <div className='recipe-instructions'>
                                <h2>Instructions <div class="recipe__decoration-line"></div></h2>
                                <ol className='recipe-instructions__list'>
                                {
                                    recipe.instructions.map((key, index) => (
                                        <React.Fragment key={"instructions-"+index}>
                                            {
                                                key.includes('HHH') ?
                                                <h3 key={"list-instructions-title-"+index}>{key.split("HHH")}</h3>
                                                :
                                                <li key={"list-instructionsItem-"+index}>
                                                    <div className={`recipe-instructions__container ${index}`}>
                                                        <span dangerouslySetInnerHTML={{__html: key}} />
                                                    </div>
                                                </li>
                                            }
                                        </React.Fragment>
                                    ))
                                }
                                </ol>
                            </div>
                            <div className='recipe-nutrition'>
                                <h2>Nutrition <div class="recipe__decoration-line"></div></h2>
                                <div className='recipe-nutrition__content'>
                                    {
                                        recipe.nutrition.map((key, index) => (
                                            <React.Fragment key={"instructions-"+index}>
                                                <span className='recipe-nutrition__name'>
                                                    {key.split(": ")[0]}:&nbsp;
                                                    <span className='recipe-nutrition__value'>{key.split(": ")[1]}</span> ??&nbsp;
                                                </span>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </main>
                        <aside>
                            <RecipeWidget />
                        </aside>
                    </> :
                    <Navigate to='/404' replace />
                }
            </div>
        </div>
    )
}

export default Recipe;