import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../'

const Categories = () => {
    const location = useLocation();
    const [categoryName, setCategoryName] = useState(
        location.pathname.split('/categories/recipes/')[1].slice(0, -1)
    );
    const [listOfRecipes, setListOfRecipes] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        setCategoryName(location.pathname.split('/categories/recipes/')[1].slice(0, -1));
    }, [location])
    
    useEffect(() => {
        const fetchRecipes = () => {
            fetch(`http://localhost:8000/api/recipes/category/${categoryName}`)
                .then((response) => response.json())
                .then((json) => setListOfRecipes(json))
                .catch((error) => console.error(error));
        }
        
        fetchRecipes();
        
    }, [categoryName]);
    
    return (
        <div className='category'>
            <div className='container'>
                <div className='category-header'>
                
                </div>
                <div className='category-content'>
                {
                    listOfRecipes ? 
                    <>
                        { 
                            listOfRecipes.names.length > 0 ?
                            listOfRecipes.names.map((key, index) => (
                                <Post key={index} name={key} />
                            ))
                            :
                            navigate('/404')
                        }
                    </>
                    :
                    "Loading recipes..."
                }
                </div>
            </div>
        </div>
    )
}

export default Categories;