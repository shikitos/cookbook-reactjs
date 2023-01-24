import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './CreateRecipe.css'

function CreateRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  let recipe = {};

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImage(acceptedFiles[0]);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    recipe = {
      name,
      ingredients,
      instructions,
      image,
      category,
      description
    };
    // Create a new FormData object
    const formData = new FormData();

    // Append the recipe data and image to the FormData object
    Object.keys(recipe).forEach(key => formData.append(key, recipe[key]));
    formData.append('image', image);
    await axios.post('http://localhost:3000/api/recipes', formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
      <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {image ? <img src={URL.createObjectURL(image)} alt="Uploaded" width="300" height="300" /> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button onClick={(e) => handleSubmit(e)} type="submit">Create recipe</button>
    </form>
  );
}

export default CreateRecipe;
