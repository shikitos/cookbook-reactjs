import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../';
import { categoriesContent } from '../../utils/constants';
import './Categories.css';
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
            <main>
                <div className='category-header'>
                    <div className='container'>
                        <div className='category-header__text'>
                            <h1>
                                {categoriesContent[categoryName].title}
                            </h1>
                            <p>
                                {categoriesContent[categoryName].description}
                            </p>
                        </div>
                        <div className='category-header__img'>
                            <img src={categoriesContent[categoryName].img} alt={categoriesContent[categoryName].title} />
                        </div>
                    </div>
                </div>
                <div className='category-content container'>
                {
                    listOfRecipes ? 
                    <>
                        { 
                            listOfRecipes.id.length > 0 ?
                            listOfRecipes.id.map((key, index) => (
                                <Post key={index} id={key} />
                            ))
                            :
                            navigate('/404')
                        }
                    </>
                    :
                    "Loading recipes..."
                }
                </div>
            </main>
        </div>
    )
}

export default Categories;