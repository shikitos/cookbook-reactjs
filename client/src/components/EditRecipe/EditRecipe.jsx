import { React, useEffect, useState } from 'react';
import './EditRecipe.css';
import { InputData } from '../';
import { createRecipeTitles } from '../../utils/constants'; 
    
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
        servings: 1
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
                console.log("interval < 100... start interval")
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
		console.log("e",e);
        console.log("state",exactRecipe[name])
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
          
    const handleTextareaOnFocus = (textarea, focused) => {
        if (focused) {
            textarea.style.height = "75px";
            textarea.style.height = ( 25 + textarea.scrollHeight ) + "px";
        } else {
            textarea.style.height = "75px";
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
        console.log(allRecipes);
        console.log((allRecipes["itemsToShow"] === "searchRecipes" && allRecipes["searchRecipes"].length === 0) ? true : false);
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
                {/* update state after loading */}
                <h1>Edit Recipe</h1>
                    {exactRecipe && 
                        <div className='exact-recipe__container'>
                            { Object.keys(exactRecipe).filter(key => key !== 'imageData').map((key, index) => (
                                <>
                                    <InputData
                                        // title = {createRecipeTitles[key].titleValue ? createRecipeTitles[key].titleValue : '' }
                                        disabled = {key === '_id' ? true : false}
                                        element = {key === 'servings' ? 'input' : 'textarea'}
                                        key = {key+"componentInputData"}
                                        elementName = {key}
                                        type = {key === 'servings' ? 'number' : 'text'}
                                        sizeOnFocus = {key === 'servings' ? '45px' : '55px'}
                                        // placeholder = {createRecipeTitles[key].placeholder ? createRecipeTitles[key].placeholder : '' }
                                        array = {Array.isArray(exactRecipe[key]) ? true : false}
                                        onChange = {e => handleChildValue(e, key)} 
                                        divider = {true}
                                        defaultValue = {exactRecipe[key]} 
                                        onFocus={e => console.log("here", e.target)} 
                                        fetchedObj = {exactRecipe}
                                        numberMin = {key === 'servings' ? '0' : ''}
                                        numberMax = {key === 'servings' ? '' : ''}
                                        lastChild = {index === Object.keys(exactRecipe).length - 2 ? true : false}
                                    />
                                </>
                            ))} 
                    
                            {/* <p>
                                Recipe Name:
                            </p>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                defaultValue={exactRecipe.name} 
                                onFocus={e => console.log("here",e.target)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, name: e.target.value })} 
                            />
                            <p>
                                URL to related recipe page:
                            </p>
                            <input 
                                type="text" 
                                placeholder="URL Id Name" 
                                defaultValue={exactRecipe.urlIdName} 
                                onChange={e => setExactRecipe({ ...exactRecipe, urlIdName: e.target.value })} 
                            />
                            <p>
                                Review:
                            </p>
                            <input 
                                type="number" 
                                placeholder="Review" 
                                defaultValue={exactRecipe.review} 
                                onChange={e => setExactRecipe({ ...exactRecipe, review: e.target.value })} 
                            />
                            <p>
                                Preparation Time:
                            </p>
                            <input 
                                type="text" 
                                placeholder="Praparation time" 
                                defaultValue={exactRecipe.preparationTime} 
                                onChange={e => setExactRecipe({ ...exactRecipe, preparationTime: e.target.value })} 
                            />
                            <p>
                                Ingredients:
                            </p>
                            <textarea 
                                placeholder="Ingredients" 
                                defaultValue={exactRecipe.ingredients} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)} 
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, ingredients: e.target.value })} 
                            />
                            <p>
                                Tags:
                            </p>
                            <textarea 
                                placeholder="Tags" 
                                defaultValue={exactRecipe.tags} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, tags: e.target.value })} 
                            />
                            <p>
                                Recipe Description:
                            </p>
                            <textarea 
                                placeholder="Description" 
                                defaultValue={exactRecipe.description} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, description: e.target.value})} 
                            />
                            <p>
                                Recipe Instruction:
                            </p>
                            <textarea 
                                placeholder="Instructions in the HTML format with images in base64 included" 
                                defaultValue={exactRecipe.instructions} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, instructions: e.target.value})} 
                            />
                            <p>
                                Nutritions:
                            </p>
                            <input 
                                type="text" 
                                placeholder="Nutritions" 
                                defaultValue={exactRecipe.nutrition} 
                                onChange={e => setExactRecipe({ ...exactRecipe, nutrition: e.target.value})} 
                            /> */}
                        </div>
                    }
                        <button onClick={(e) => handleSubmit(e, exactRecipe['_id'])}>Save Changes</button>
                        <button onClick={() => setAllRecipes({ ...allRecipes, showAllRecipes: true,  })}>Show All Recipes</button>
                </div>
            : ''}
        </div>
    )
}
    
export default EditRecipe;