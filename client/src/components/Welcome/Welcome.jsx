import React from "react";
import { Post, WelcomeSection, CreateRecipe } from "../";
import './Welcome.css';
import { exampleURLImage } from "../../utils/constants";


const Welcome = () => {
    const recipeNames = ["Shio Test", "Curry Udon カレーうどん", "my recipe", "Katsu Curry カツカレー"];

    return (
  
        <main className="site-main">
    
        <div className="posts">
            <div className="container">
                <div className="section-post">
                    <div className="section-post">
                      {recipeNames.map(name => (
                        <Post key={name} name={name} />
                      ))}
                    </div>
                </div>
            </div>
        </div>
      
        <WelcomeSection 
            sectionTitle = "Latest Posts"
            sectionRouteName = "POSTS" 
            routeToUrl = "blog/"
        />
        </main>
    )
};

export default Welcome;