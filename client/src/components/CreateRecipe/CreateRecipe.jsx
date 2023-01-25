import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './CreateRecipe.css'

function CreateRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [category, setCategory] = useState('');
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
  
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      name,
      ingredients: ingredients.split(", "),
      instructions: instructions.split(", "),
      image: imageData,
      category,
      description: description.split(", ")
    };
    console.log(JSON.stringify({recipe}));
    const res = await fetch('http://localhost:8000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    });
    const data = await res.text();
    setResponse(data);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps()} type="file" onChange={handleFileChange}/>
          {imageData ? <img src={imageData} alt="Uploaded" width="300" height="300" /> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <button onClick={(e) => handleSubmit(e)} type="submit">Create recipe</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default CreateRecipe;
