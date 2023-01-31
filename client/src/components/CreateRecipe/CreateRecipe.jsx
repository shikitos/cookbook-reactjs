import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputData } from '../'
import './CreateRecipe.css'

function CreateRecipe(props) {
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
  
  const [recipe, setRecipe] = useState({
    name: '',
    review: 5,
    preparationTime: '',
    ingredients: [],
    tags: [],
    instructions: [],
    description: '',
    imageData: null,
    nutrition: []
  });


  const { getRootProps, getInputProps } = useDropzone({
	accept: 'image/*',
	onDrop: acceptedFiles => {
	  const file = acceptedFiles[0];
	  const reader = new FileReader();
	  reader.onloadend = () => {
		setRecipe({...recipe, imageData: reader.result});
	  }
	  reader.readAsDataURL(file);
	}
  });

  const handleTextareaOnFocus = (textarea, focused) => {
	if (focused) {
		textarea.style.height = "75px";
		textarea.style.height = ( 25 + textarea.scrollHeight ) + "px";
	} else {
		textarea.style.height = "75px";
	}
  }
  
    const handleChildValue = (e, name) => {
        console.log(Array.isArray(recipe['review']));
        setRecipe({
            ...recipe,
            [name]: e
        });
        console.log(recipe);
	};


  const handleSubmit = async (e) => {
	e.preventDefault();
	if (window.confirm("Do you want to create new post?")) {
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
	        <form>
	        
				{
					Object.keys(recipe)
					.filter(key => key !== 'imageData')
					.map((key, index) => (
						<>
							<p>Set {key.toUpperCase()}</p>
							<InputData
								element={key === 'review' ? 'input' : 'textarea'}
								key={key}
								elementName={key}
								type={key === 'review' ? 'number' : 'text'}
								sizeOnFocus={key === 'review' ? '45px' : '55px'}
								placeholder={`Set ${key}`}
								array={Array.isArray(recipe[key]) ? true : false}
								onChange={e => handleChildValue(e, key)} 
							/>
						</>
					))
				}
	        
				{/* <InputData 
					element="input" 
					type="text"
					sizeOnFocus="55px"
					placeholder="Set Name"
					onChange={e => setRecipe({ ...recipe, name: e.target.value})}
				/>
				{/* <input
		            type="text"
		            placeholder="Name"
		            value={name}
		            onChange={e => setName(e.target.value)}
				/> 
				<input
				    type="number"
					placeholder="Review"
				    value={review}
				    onChange={e => setReview(e.target.value)}
				/>
				<input
		            type="text"
				    placeholder="Time"
				    value={preparationTime}
				    onChange={e => setPreparationTime(e.target.value)}
				/>
		<textarea
		  placeholder="Ingredients"
		  value={ingredients}
		  onChange={e => setIngredients(e.target.value)}
		  onFocus={e => handleTextareaOnFocus(e.target, true)}
		  onBlur={e => handleTextareaOnFocus(e.target, false)}
		/>
		<textarea
		  placeholder="Tags"
		  value={tags}
		  onChange={e => setTags(e.target.value)}
		  onFocus={e => handleTextareaOnFocus(e.target, true)}
		  onBlur={e => handleTextareaOnFocus(e.target, false)}
		/>
		<textarea
		  placeholder="Description"
		  value={description}
		  onChange={e => setDescription(e.target.value)}
		  onFocus={e => handleTextareaOnFocus(e.target, true)}
		  onBlur={e => handleTextareaOnFocus(e.target, false)}
		/>
		<textarea
		  placeholder="Instructions in the HTML format with images in base64 included"
		  value={instructions}
		  onChange={e => setInstructions(e.target.value)}
		  onFocus={e => handleTextareaOnFocus(e.target, true)}
		  onBlur={e => handleTextareaOnFocus(e.target, false)}
		/>
		<input
		  type="text"
		  placeholder="Nutritions"
		  value={nutrition}
		  onChange={e => setNutrition(e.target.value)}
		/> */}
		<div className='dropzone' {...getRootProps()}>
		  <input {...getInputProps()} />
		  {recipe["imageData"] ? <img src={recipe["imageData"]} alt="Uploaded" width="300" height="300" /> : <p>Drag 'n' drop some files here, or click to select files</p>}
		</div>
		<button className='submit-button' onClick={(e) => handleSubmit(e)} type="submit">Create recipe</button>
	  </form>
	  {response && <div>{response}</div>}
	</div>
  );
}

export default CreateRecipe;
