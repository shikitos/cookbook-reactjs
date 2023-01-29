import { React, useEffect, useState, useRef } from 'react';
import './EditRecipe.css';
    
const EditRecipe = () => {
    const [recipes, setRecipes] = useState(null);
    const [showAllRecipes, setShowAllRecipes] = useState(true);
    const [exactRecipe, setExactRecipe] = useState(null);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [description, setDescription] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [status, setStatus] = useState(false);
    const [progress, setProgress] = useState(0);
    const textareaRef = useRef(null);
    
    useEffect(() => {
        if (showAllRecipes) {
            setExactRecipe(null);
            fetch("http://localhost:8000/api/recipes")
            .then(response => response.json())
            .then(data => setRecipes(data))
        } 
        
        let interval;
        if (status) {
            if (progress < 100) {
                interval = setInterval(() => {
                    setProgress(prevProgress => prevProgress + 1);
                }, 50);
            } else {
                setStatus(false);
                clearInterval(interval);
            }
        }
        return () => {
            clearInterval(interval);
        }
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAllRecipes, exactRecipe, status, progress]);
    
    useEffect(() => {
        if (exactRecipe) {
            setName(exactRecipe.name);
            setReview(exactRecipe.review);
            setPreparationTime(exactRecipe.preparationTime);
            setIngredients(exactRecipe.ingredients);
            setTags(exactRecipe.tags);
            setDescription(exactRecipe.description);
            setInstructions(exactRecipe.instructions);
            setNutrition(exactRecipe.nutrition);
            const testSet = {
                name,
                review,
                tags,
                preparationTime,
                description,
                instructions,
                ingredients,
                nutrition,
            };
        }
    }, [exactRecipe]);
    
    useEffect(() => {
        console.log(name);
    }, [exactRecipe]);
          
    const handleClick = async (e, id) => {
        e.preventDefault();
        setRecipes(null);
        await fetch(`http://localhost:8000/api/recipes/${id}`)
            .then(response => response.json())
            .then(data => setExactRecipe(data))   
    }
          
    const handleSubmit = async (e, id) => {
        e.preventDefault();
        if (window.confirm("Do you want to submit?")) {
            const recipe = {
                name,
                review,
                tags,
                preparationTime,
                description,
                instructions,
                ingredients,
                nutrition,
            };
            console.log(recipe);
            const res = await fetch(`http://localhost:8000/api/recipes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe)
            });
            const data = await res.text();
            setProgress(0);
            setStatus(true);
            setRecipes(null);
            setShowAllRecipes(true);
        } else {
            return false;
        }
    }
          
    const handleTextareaOnFocus = (textarea, focused) => {
        if (focused) {
            textarea.style.height = "75px";
            textarea.style.height = (25+textarea.scrollHeight)+"px";
        } else {
            textarea.style.height = "75px";
        }
    }
        
        
    return (
        <div className='recipes container'>
            <h2>All recipes displayed below:</h2>
            {status && 
            <div className='recipe-updated'>
                <div className='recipe-updated__text'>Recipe has been successfully updated!</div>
                <div className='recipe-updated__preloader' style={{background: `linear-gradient(to right, #f0efef ${progress}%, #33751f 0%)`}}></div>
            </div>}
            {(recipes && showAllRecipes) ? recipes.map((recipe, index) => (
            <div 
                className="recipe_id" 
                key={index}
                onClick={e => {
                    handleClick(e, recipe["_id"]);
                    setShowAllRecipes(false);
                }}
            >
                ID: {recipe["_id"]}, NAME: {recipe.name}
            </div>
            )) : '' }
            {
                (!showAllRecipes && !recipes) ? 
                <div className='exact_recipe'>
                {/* update state after loading */}
                    {exactRecipe && 
                        <div>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                defaultValue={exactRecipe.name} 
                                onFocus={e => console.log("here",e.target)} 
                                onChange={e => setName(e.target.value)} 
                            />
                            <input 
                                type="number" 
                                placeholder="Review" 
                                defaultValue={exactRecipe.review} 
                                onChange={e => setReview(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Praparation time" 
                                defaultValue={exactRecipe.preparationTime} 
                                onChange={e => setPreparationTime(e.target.value)} 
                            />
                            <textarea 
                                placeholder="Ingredients" 
                                defaultValue={exactRecipe.ingredients} 
                                ref={textareaRef} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)} 
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setIngredients(e.target.value)} 
                            />
                            <textarea 
                                placeholder="Tags" 
                                defaultValue={exactRecipe.tags} 
                                ref={textareaRef} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setTags(e.target.value)} 
                            />
                            <textarea 
                                placeholder="Description" 
                                defaultValue={exactRecipe.description} 
                                ref={textareaRef} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setDescription(e.target.value)} 
                            />
                            <textarea 
                                placeholder="Instructions in the HTML format with images in base64 included" 
                                defaultValue={exactRecipe.instructions} 
                                ref={textareaRef} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}  
                                onBlur={e => handleTextareaOnFocus(e.target, false)} 
                                onChange={e => setInstructions(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Nutritions" 
                                defaultValue={exactRecipe.nutrition} 
                                onChange={e => setNutrition(e.target.value)} 
                            />
                        </div>
                    }
                        <button onClick={(e) => handleSubmit(e, exactRecipe['_id'])}>Save Changes</button>
                        <button onClick={() => setShowAllRecipes(true)}>Show All Recipes</button>
                </div>
            : ''}
        </div>
    )
}
    
export default EditRecipe;