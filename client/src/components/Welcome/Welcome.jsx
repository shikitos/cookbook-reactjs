import React, {useState, useEffect} from "react";
import { Post, WelcomeSection, CreateRecipe } from "../";
import './Welcome.css';
import { exampleURLImage } from "../../utils/constants";




const Welcome = () => {
    const recipeIds = ["63e6ad05f06b7d8d30ff9884", "63d46632ef386b89bc4b5c6a", "63e42e907e51682c4b30e8aa", "63e02711da690f2649146160"];
    const [hovered, setHover] = useState(false);
    const [latestRecipes, setLatestRecipes] = useState(null);
    
    useEffect(() => {
        const fetchLatest = () => {
            console.log("Fetching latest");
            fetch('http://localhost:8000/api/recipes/latest')
                .then((response) => response.json())
                .then((json) => setLatestRecipes(json))
                .catch((error) => console.error(error));
        }
        
        if (!latestRecipes) fetchLatest();
    }, [])
    
    
    function handleClick(e, path) {
        e.preventDefault();
        //navigate(path);
    }

    return (
  
        <main className="site-main">
    
        <div className="posts">
            <div className="container">
                <div className="section-post">
                    <div className="section-post">
                      {recipeIds.map((id, index) => (
                        <Post key={index} id={id} />
                      ))}
                    </div>
                </div>
            </div>
        </div>
      
        <div className="latest">
            <div className='container'>
                <div className="latest-header">
                    <div className='latest-header__title'>
                        <h2>Latest Posts</h2>
                    </div>
                    <div 
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={ hovered ? 'latest-header__route hovered' : 'latest-header__route'}
                    >
                        <span>VIEW <em>all</em> POSTS</span>
                        <svg className="svg-icon" width="30" height="30" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <path d="M32.17,20.66a1,1,0,0,1,.09,1.39L26,29.24a1,1,0,0,1-.74.34,1,1,0,0,1-.75-.35l-6.28-7.18a1,1,0,0,1,.09-1.34,1,1,0,0,1,1.39,0l5.55,6.34,5.56-6.33A1,1,0,0,1,32.17,20.66ZM40,25A15,15,0,1,1,25,10,15,15,0,0,1,40,25Zm-2,0h0A13,13,0,1,0,25,38,13.06,13.06,0,0,0,38,25Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="latest-content">
                    <>
                    {
                        latestRecipes ?
                        latestRecipes.id.map((value, index) => (
                            <Post key={index} id={value} extended={true} />
                        ))
                        :
                        "Loading latest recipes..."
                        
                    }
                    </>
                </div>
            </div>
        </div>
        </main>
    )
};

export default Welcome;