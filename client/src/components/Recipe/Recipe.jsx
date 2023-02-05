import React from 'react';
import "./Recipe.css";
import { useLocation } from 'react-router-dom';

const Recipe = () => {
    const location = useLocation();
    const recipe = location.state;

    return (
        <div className='recipe'>
            {recipe &&
                <>
                    <h1>{recipe.name}</h1>
                    <hr />
                    <div className='recipe-meta'>
                        <p>{recipe.preparationTime}</p>
                    </div>
                    <div className='recipe-description'>
                        <p>{recipe.description}</p>
                    </div>
                    <div>
                        <img src={recipe.image} alt={recipe.name} />
                    </div>
                    <div>
                        <h2>ingredients</h2>
                        {recipe.ingredients.map((key, index) => (
                            <div key={index}>
                                <input type="checkbox" name={key} />
                                <p>{key}</p>
                            </div>
                        ))}
                    </div>
                    <div>
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
    )
}

export default Recipe;