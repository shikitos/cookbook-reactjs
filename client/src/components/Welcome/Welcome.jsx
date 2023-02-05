import React from "react";
import { Post, WelcomeSection, CreateRecipe } from "../";
import './Welcome.css';
import { exampleURLImage } from "../../utils/constants";

const Welcome = () => {

    return (
  
        <main className="site-main">
    
        <div className="posts">
            <div className="container">
                <div className="section-post">
                    <Post 
                        name="Shio Test"
                    />
                    <Post 
                        name="Curry Udon カレーうどん"
                    />
                    <Post 
                        name="my recipe"
                    />
                    <Post 
                  
                    />
                
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