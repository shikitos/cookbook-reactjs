import React from "react";
import { Post, WelcomeSection } from "../";
import './Welcome.css';
import { exampleURLImage } from "../../utils/constants";

const Welcome = () => {

  return (
  
    <main className="site-main">
    
      <div className="posts">
        <div className="container">
          <div className="section-post">
            <Post 
              title = "Shio Ramen 塩ラーメン"
              imagePath = {exampleURLImage}
              postUrl="shio-ramen/"
            />
            <Post 
              title="Lunar New Year Recipes for Good Luck & Happiness"
              imagePath = {exampleURLImage}
              postUrl="chinese-new-year-recipes/"
            />
            <Post 
              title="Katsu Curry カツカレー"
              imagePath = {exampleURLImage}
              postUrl="katsu-curry/"
            />
            <Post 
              title="16 Cozy & Nutritious Japanese Soups to Make at Home"
              imagePath = {exampleURLImage}
              postUrl="best-japanese-soups-recipes/"
            />
            
          </div>
        </div>
      </div>
      
      <div className="latest">
        <div className="container">
          <WelcomeSection 
            sectionTitle = "Latest Posts"
            sectionRouteName = "POSTS" 
            routeToUrl = "blog/"
          />
        </div>
      </div>
      
    </main>
  )
};

export default Welcome;