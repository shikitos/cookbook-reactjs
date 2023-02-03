import { React, useEffect, useState } from 'react';
import './EditRecipe.css';
import { InputData } from '../';
import { editRecipeTitles } from '../../utils/constants'; 
    
const EditRecipe = () => {
    const [allRecipes, setAllRecipes] = useState({ 
        recipesList: null, 
        showAllRecipes: true, 
        searchRecipes: [], 
        showSearchItems: false, 
        itemsToShow: 'recipesList' 
    });
    const [exactRecipe, setExactRecipe] = useState({ 
        _id: '',
        name: '', 
        urlIdName: '',
        // review: '', 
        preparationTime: '', 
        ingredients: [], 
        tags: [], 
        instructions: '', 
        description: '', 
        nutrition: [],
        servings: 1,
        categories: [],
        creationTime: ''
    });
    const [status, setStatus] = useState({ 
        flag: false, 
        popUp: false 
    });
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
    
        if (allRecipes["showAllRecipes"]) {
            setAllRecipes({ ...allRecipes, showAllRecipes: false });
            setExactRecipe(null);
            fetch("http://localhost:8000/api/recipes")
            .then(response => response.json())
            .then(data => setAllRecipes({ ...allRecipes, recipesList: data, showAllRecipes: false }))
        } 
        if (status["flag"]) {
            setStatus({ ...status, flag: false });
            let interval;
        
            if (progress === 0) {
                interval = setInterval(() => {
                    setProgress(progress => {
                        if (progress >= 100) {
                            clearInterval(interval);
                            setStatus({ ...status, popUp: false});
                            return 100;
                        }
                        return progress + 1;
                    });
                }, 50);
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allRecipes["showAllRecipes"], status["flag"]]);
          
    const handleClick = async (e, id) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/recipes/${id}`)
            .then(response => response.json())
            .then(data => setExactRecipe(data)) 
    }
    
    const handleChildValue = (e, name) => {
	    setExactRecipe({
	        ...exactRecipe,
	        [name]: e
		});
	};
          
    const handleSubmit = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Do you want to submit?")) {
            const res = await fetch(`http://localhost:8000/api/recipes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exactRecipe)
            });
            const data = await res.text();
            setProgress(0);
            setStatus({ popUp: true, flag: true});
            setAllRecipes({ ...allRecipes, showAllRecipes: true });
        } else {
            return false;
        }
    }

    
    const handleSearchRecipe = (e) => {
        if (e.target.value) {
            let searchRecipes = [];
            let noMatch = false;
            for (let i = 0; i < allRecipes.recipesList.length; i++) {
                if (allRecipes.recipesList[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {   
                    searchRecipes.push(allRecipes.recipesList[i]);
                } else {
                    noMatch = true;
                }
            } 
            let itemsToShow = allRecipes["searchRecipes"].length > 0 || noMatch ? "searchRecipes" : "recipesList";
            setAllRecipes({
              ...allRecipes,
              searchRecipes,
              showSearchItems: allRecipes["searchRecipes"].length > 0,
              itemsToShow
            });
        } else  {
            setAllRecipes({
                ...allRecipes,
                searchRecipes: [],
                showSearchItems: allRecipes["searchRecipes"].length > 0,
                itemsToShow: "recipesList"
            });
        }
    }
    
    const setInputPlaceholderOrTitle = (eventType, key) => {
        if (editRecipeTitles[key]) {
            let returnedValue = eventType === "title" ? 
            editRecipeTitles[key].titleValue :
            editRecipeTitles[key].placeholder;
            return returnedValue;
        } else {
            return 'None'
        }
    }
        
        
        
    return (
        <div className='recipes container'>
            { allRecipes["recipesList"] &&
            <div className='recipes-header'>
                <h2>All Existed Recipes</h2>
                <form>
                    <input type='text' placeholder='Search recipe by name' className='recipes-search' onChange={e => handleSearchRecipe(e)} />
                </form>
            </div>
            }
            {
            status["popUp"] && 
            <div className='recipe-updated'>
                <div className='recipe-updated__text'>Recipe has been successfully updated!</div>
                <div className='recipe-updated__preloader' style={{background: `linear-gradient(to right, #f0efef ${progress}%, #33751f 0%)`}}></div>
            </div>
            }
            <div className='recipes-list'>
                {
                    (allRecipes["recipesList"] && !allRecipes["showAllRecipes"]) ? 
                    allRecipes[allRecipes["itemsToShow"]].map((recipe, index) => (
                        <span 
                            className="recipe_id" 
                            key={index}
                            onClick={e => {
                                handleClick(e, recipe["_id"]);
                                setAllRecipes({ ...allRecipes, recipesList: null, showAllRecipes: false, showSearchItems: false })
                                
                            }}
                        >
                            {index+1}. ID: <em>{recipe["_id"]}</em>, NAME: <em>{recipe.name}</em>
                        </span>
                    )) 
                    
                    : "" 
                }
            </div>
            
            { (allRecipes["itemsToShow"] === "searchRecipes" && allRecipes["searchRecipes"].length === 0) && <span className='recipes-empty'>No matches were found...</span> }
            
            {
                (!allRecipes["showAllRecipes"] && !allRecipes["recipesList"]) ? 
                <div className='exact-recipe'>
                <h1>Edit Recipe</h1>
                    {exactRecipe ?
                        <div className='exact-recipe__container'>
                            { Object.keys(exactRecipe).filter(key => key !== 'image' && key !== "time" && key !== "__v" && key !== 'review').map((key, index) => (
                                <>
                                {/* I found out I did a big mistake.
                                    Now every changing of any input triggers
                                    Rerending all inputs....
                                */}
                                    <InputData
                                        title = {setInputPlaceholderOrTitle("title", key)}
                                        disabled = {key === '_id' || key === 'creationTime' ? true : false}
                                        element = {key === 'servings' ? 'input' : 'textarea'}
                                        key = {key+"componentInputData"}
                                        elementName = {key}
                                        recipeArrayItemsCreated = {Array.isArray(exactRecipe[key]) ? exactRecipe[key].length : ''}
                                        type = {key === 'servings' ? 'number' : 'text'}
                                        sizeOnFocus = {key === 'servings' ? '45px' : '55px'}
                                        placeholder = {setInputPlaceholderOrTitle("placeholder", key)}
                                        array = {Array.isArray(exactRecipe[key]) ? true : false}
                                        divider = {true}
                                        defaultValue = {exactRecipe[key]} 
                                        onFocus={e => console.log("here", e.target)} 
                                        numberMin = {key === 'servings' ? '0' : ''}
                                        numberMax = {key === 'servings' ? '' : ''}
                                        lastChild = {index === Object.keys(exactRecipe).length - 2 ? true : false}
                                        onChange = {e => handleChildValue(e, key)} 
                                    />
                                </>
                            ))} 
                        </div>
                    : 'Loading recipes...'}
                        <button className="exact-recipe__save" onClick={(e) => handleSubmit(e, exactRecipe['_id'])}>Save Changes</button>
                        <button className="exact-recipe__back" onClick={() => setAllRecipes({ 
                                recipesList: null, 
                                showAllRecipes: true, 
                                searchRecipes: [], 
                                showSearchItems: false, 
                                itemsToShow: 'recipesList'   
                            })}>
                            Show All Recipes
                        </button>
                </div>
            : ''}
        </div>
    )
}
    
export default EditRecipe;