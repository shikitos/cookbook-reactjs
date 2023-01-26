import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeSection.css';
// import buttonLinkUrl from '../../utils/button-link.svg';
import { BlogCards } from '../';

// Reduce props num
const WelcomeSection = ({sectionTitle, sectionRouteName, routeToUrl}) => {
  const [hovered, setHover] = useState(false)
  let navigate = useNavigate();
  
  function handleClick(e, path) {
    e.preventDefault();
    navigate(path);
  }

  return (
      <div className="latest">
        <div className='container'>
          <div className="latest-header">
            <div className='latest-header__title'>
              <div></div>
              <h2>{sectionTitle}</h2>
            </div>
            <div 
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={ hovered ? 'latest-header__route hovered' : 'latest-header__route'}
              onClick={(e) => handleClick(e, `${routeToUrl}`)}
              
            >
              <span>VIEW <em>all</em> {sectionRouteName}</span>
              {/* <img src={buttonLinkUrl} alt='View all posts of this category'/> */}
              {/* <svg>{buttonLinkUrl}</svg> */}
              {/* IS IT RIGHT? */}
              <svg className="svg-icon" width="30" height="30" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M32.17,20.66a1,1,0,0,1,.09,1.39L26,29.24a1,1,0,0,1-.74.34,1,1,0,0,1-.75-.35l-6.28-7.18a1,1,0,0,1,.09-1.34,1,1,0,0,1,1.39,0l5.55,6.34,5.56-6.33A1,1,0,0,1,32.17,20.66ZM40,25A15,15,0,1,1,25,10,15,15,0,0,1,40,25Zm-2,0h0A13,13,0,1,0,25,38,13.06,13.06,0,0,0,38,25Z"></path></svg>
            </div>
          </div>
          <BlogCards 
            // cardCategory = {cardCategory}
            // cardTitle = {cardTitle}
            // cardDescription = {cardDescription}
            // cardRouteUrl = {cardRouteUrl}
          />
        </div>
      </div>
  )
}

export default WelcomeSection;