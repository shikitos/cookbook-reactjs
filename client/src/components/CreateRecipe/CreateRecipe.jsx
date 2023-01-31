import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputData } from '../'
import './CreateRecipe.css'

function CreateRecipe(props) {
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
	  
	const handleChildValue = (e, name) => {
	    setRecipe({
	        ...recipe,
	        [name]: e
		});
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
			{
				Object.keys(recipe)
				.filter(key => key !== 'imageData')
				.map((key, index) => (
					<>
						<InputData
							title={key.toUpperCase()}
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
			<div className='dropzone' {...getRootProps()}>
	            <input {...getInputProps()} />
	            {
		            recipe["imageData"] ? 
		            <img src={recipe["imageData"]} alt="Uploaded" width="300" height="300" /> 
		            : 
		            <p>Drag 'n' drop some files here, or click to select files</p>
	            }
			</div>
			<button className='submit-button' onClick={(e) => handleSubmit(e)} type="submit">Create recipe</button>
	        {
	        response && 
	        <div>{response}</div>
	        }
		</div>
    );
}

export default CreateRecipe;
