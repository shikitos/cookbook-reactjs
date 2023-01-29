import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './CreateRecipe.css'

function CreateRecipe() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [description, setDescription] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [nutrition, setNutrition] = useState([]);
  const [response, setResponse] = useState(null);
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      }
      reader.readAsDataURL(file);
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to create new post?")) {
      const recipe = {
        name,
        review,
        tags: tags.split(", "),
        preparationTime,
        description,
        image: imageData,
        instructions,
        ingredients: ingredients.split(", "),
        nutrition: nutrition.split(", "),
      };
      console.log(recipe);
      const res = await fetch('http://localhost:8000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      const data = await res.text();
      setResponse(data);
    } else {
        return false;
    }
  };


  return (
    <div className="container create-recipe">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Review" value={review} onChange={e => setReview(e.target.value)} />
        <input type="text" placeholder="Time" value={preparationTime} onChange={e => setPreparationTime(e.target.value)} />
        <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <textarea placeholder="Tags" value={tags} onChange={e => setTags(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <textarea placeholder="Instructions in the HTML format with images in base64 included" value={instructions} onChange={e => setInstructions(e.target.value)} />
        <input type="text" placeholder="Nutritions" value={nutrition} onChange={e => setNutrition(e.target.value)} />
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps()} />
          {imageData ? <img src={imageData} alt="Uploaded" width="300" height="300" /> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <button onClick={(e) => handleSubmit(e)} type="submit">Create recipe</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default CreateRecipe;
