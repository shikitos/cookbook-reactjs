import { React, useEffect, useState } from 'react';
import './EditRecipe.css';
    
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
        review: '', 
        preparationTime: '', 
        ingredients: [], 
        tags: [], 
        instructions: '', 
        description: '', 
        nutrition: []
    });
    const [status, setStatus] = useState({ 
        flag: false, 
        popUp: false 
    });
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
    
        console.log(allRecipes);
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
          
    const handleSubmit = async (e, id) => {
        e.preventDefault();
        console.log(id);
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
                <h2>All recipes displayed below:</h2>
                <form>
                    <input type='text' placeholder='Search recipe' className='recipes-search' onChange={e => handleSearchRecipe(e)} />
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
            {
                (allRecipes["recipesList"] && !allRecipes["showAllRecipes"]) ? 
                allRecipes[allRecipes["itemsToShow"]].map((recipe, index) => (
                    <div 
                        className="recipe_id" 
                        key={index}
                        onClick={e => {
                            handleClick(e, recipe["_id"]);
                            setAllRecipes({ ...allRecipes, recipesList: null, showAllRecipes: false, showSearchItems: false })
                            
                        }}
                    >
                        ID: {recipe["_id"]}, NAME: {recipe.name}
                    </div>
                )) 
                
                : "" 
            }
            
            { (allRecipes["itemsToShow"] === "searchRecipes" && allRecipes["searchRecipes"].length === 0) && "Any matches were not found" }
            
            {
                (!allRecipes["showAllRecipes"] && !allRecipes["recipesList"]) ? 
                <div className='exact_recipe'>
                {/* update state after loading */}
                    <h1>Exact Recipe</h1>
                    {exactRecipe && 
                        <div>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                defaultValue={exactRecipe.name} 
                                onFocus={e => console.log("here",e.target)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, name: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="URL Id Name" 
                                defaultValue={exactRecipe.urlIdName} 
                                onChange={e => setExactRecipe({ ...exactRecipe, urlIdName: e.target.value })} 
                            />
                            <input 
                                type="number" 
                                placeholder="Review" 
                                defaultValue={exactRecipe.review} 
                                onChange={e => setExactRecipe({ ...exactRecipe, review: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="Praparation time" 
                                defaultValue={exactRecipe.preparationTime} 
                                onChange={e => setExactRecipe({ ...exactRecipe, preparationTime: e.target.value })} 
                            />
                            <textarea 
                                placeholder="Ingredients" 
                                defaultValue={exactRecipe.ingredients} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)} 
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, ingredients: e.target.value })} 
                            />
                            <textarea 
                                placeholder="Tags" 
                                defaultValue={exactRecipe.tags} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, tags: e.target.value })} 
                            />
                            <textarea 
                                placeholder="Description" 
                                defaultValue={exactRecipe.description} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, description: e.target.value})} 
                            />
                            <textarea 
                                placeholder="Instructions in the HTML format with images in base64 included" 
                                defaultValue={exactRecipe.instructions} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setExactRecipe({ ...exactRecipe, instructions: e.target.value})} 
                            />
                            <input 
                                type="text" 
                                placeholder="Nutritions" 
                                defaultValue={exactRecipe.nutrition} 
                                onChange={e => setExactRecipe({ ...exactRecipe, nutrition: e.target.value})} 
                            />
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