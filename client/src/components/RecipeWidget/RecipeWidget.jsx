import React, { useState, useEffect } from 'react';
import './RecipeWidget.css';
import { Post } from '../';
import { widgetRecipes } from '../../utils/constants';

const RecipeWidget = () => {

    return (
        <>
            <section className=''>
                <h3>Our Favorites!</h3>
                <div className='widget-container__posts'>
                    {widgetRecipes.favorites.map((value, index) => (
                        <Post 
                            key={index}
                            // id={value ? value : null} 
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default RecipeWidget;