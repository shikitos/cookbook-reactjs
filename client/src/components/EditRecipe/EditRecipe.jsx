import { React, useEffect, useState } from 'react';
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
  const [status, setStatus] = useState(null);
  

  useEffect(() => {
    
    if (showAllRecipes) {
      setExactRecipe(null);
      fetch("http://localhost:8000/api/recipes")
      .then(response => response.json())
      .then(data => setRecipes(data))
    } else if (exactRecipe) {
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
    
      
  }, [showAllRecipes, exactRecipe]);
  
  const handleClick = async (e, id) => {
    console.log("CLICKED!")
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
      setStatus(data.acknowledged);
      setRecipes(null);
      setShowAllRecipes(true);
      console.log(data.toJSON());
    } else {
        return false;
    }
  }
    

  return (
    <div className='recipes container'>
      <h2>All recipes displayed below:</h2>
      {status && <div>successfully updated!</div>}
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
      {(!showAllRecipes && !recipes) ? 
      <div className='exact_recipe'>
      {/* update state after loading */}
        {exactRecipe && 
          <div>
            <input type="text" placeholder="Name" defaultValue={exactRecipe.name} onFocus={e => console.log("here",e.target)} onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Review" defaultValue={exactRecipe.review} onChange={e => setReview(e.target.value)} />
            <input type="text" placeholder="Praparation time" defaultValue={exactRecipe.preparationTime} onChange={e => setPreparationTime(e.target.value)} />
            <textarea placeholder="Ingredients" defaultValue={exactRecipe.ingredients} onChange={e => setIngredients(e.target.value)} />
            <textarea placeholder="Tags" defaultValue={exactRecipe.tags} onChange={e => setTags(e.target.value)} />
            <textarea placeholder="Description" defaultValue={exactRecipe.description} onChange={e => setDescription(e.target.value)} />
            <textarea placeholder="Instructions in the HTML format with images in base64 included" defaultValue={exactRecipe.instructions} onChange={e => setInstructions(e.target.value)} />
            <input type="text" placeholder="Nutritions" defaultValue={exactRecipe.nutrition} onChange={e => setNutrition(e.target.value)} />
          </div>
        }
        <button onClick={(e) => handleSubmit(e, exactRecipe['_id'])}>Save Changes</button>
        <button onClick={() => setShowAllRecipes(true)}>Show All Recipes</button>
      </div> : ''
      }
    </div>
  )
}

export default EditRecipe;