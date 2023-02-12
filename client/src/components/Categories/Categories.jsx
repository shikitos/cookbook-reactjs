import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Post } from '../';
import { categoriesContent } from '../../utils/constants';
import './Categories.css';
const Categories = () => {
    const location = useLocation();
    const [pageName, setPageName] = useState({
        query: '',
        type: ''
    });
    const [listOfRecipes, setListOfRecipes] = useState(null);
    let navigate = useNavigate();
    
    // useEffect(() => {
    //     console.log('location');
    //     if (location.pathname.includes('tags')) setPageName(data => ({
    //         type: 'tag', 
    //         query: location.pathname.split('/tags/')[1].slice(0, -1)
    //     }));
    //     else if (location.pathname.includes('categories')) setPageName(data => ({
    //         type: 'category', 
    //         query: location.pathname.split('/categories/recipes/')[1].slice(0, -1)
    //     }));
    // }, [location])
    
    useEffect(() => {
        console.log('location.pathname');
        if (location.pathname.includes('tags')) setPageName(data => ({
            type: 'tag', 
            query: location.pathname.split('/tags/')[1].slice(0, -1)
        }));
        else if (location.pathname.includes('categories')) setPageName(data => ({
            type: 'category', 
            query: location.pathname.split('/categories/recipes/')[1].slice(0, -1)
        }));
    }, [location.pathname])
    
    useEffect(() => {
    
        console.log('pageName');

        const fetchRecipes = () => {
            fetch(`http://localhost:8000/api/recipes/${pageName.type}/${pageName.query}`)
                .then((response) => response.json())
                .then((json) => setListOfRecipes(json))
                .catch((error) => console.error(error));
        }
        console.log(location.pathname, pageName)
        if (pageName.type) fetchRecipes();
        
    }, [pageName]);
    
    return (
        <div className='category'>
            <main>
                <div className='category-header'>
                    <div className='container'>
                        <div className='category-header__text'>
                            <h1>
                                {categoriesContent[pageName.query]?.title}
                            </h1>
                            <p>
                                {categoriesContent[pageName.query]?.description}
                            </p>
                        </div>
                        <div className='category-header__img'>
                            <img src={categoriesContent[pageName.query]?.img} alt={categoriesContent[pageName.query]?.title} />
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
                            <Navigate to='/404' replace />
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