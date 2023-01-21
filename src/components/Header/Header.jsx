import React, { useState } from 'react';
import "./Header.css";
import logo from '../../utils/logo-umai.svg';
import check from '../../utils/check.svg';

const Header = () => {
  const [isHovered, setHover] = useState(false);
  const [hoveredElem, setHoveredElem] = useState(-1);
  const navElements = [
    {
      title: "Recipes",
      href: "#recipes",
      submenu: [
        "Filter",
        "Index",
        "Latest",
        "Popular"
      ]
    },
    {
      title: "Course",
      href: "#course",
      submenu: [
        "Appetizer",
        "Beverage",
        "Breakfast",
        "Dessert",
        "Main Dish",
        "Salad",
        "Side Dish",
        "Snack",
        "Soup + Stew"
      ]
    },
    {
      title: "Dietary",
      href: "#dietary",
      submenu: [
        "Gluten-Free",
        "Vegan",
        "Vegan/Vegetarian",
        "Vegetarian"
        
      ]
    },
    {
      title: "Ingredient",
      href: "#ingredient",
      submenu: [
        "Bean"
      ]
    },
    {
      title: "Preparation",
      href: "#preparation",
      submenu: [
        "Bento"
      ],
    },
    {
      title: "Dish Type",
      href: "#dish",
      submenu: [
        "Bread"
      ],
    },
  ];


  return (
    <header className='header container'>
      <div className='header-logo'>
        <img src={logo} alt="Logotype UMAI in japanese" />
      </div>
      <nav className='header-nav'>
        <ul>
          {
            navElements.map((element, index) => (
              <li 
                key={index}
                onMouseEnter={() => {
                  setHover(true);
                  setHoveredElem(index);
                }}
                onMouseLeave={() => setHover(false)}
              >       
                <a href={element.href}>
                  {element.title}
                </a>
                <button className="header-nav__button">
                  <img src={check} alt="Submenu navbar"/>
                </button>
                <ul 
                  className='header-nav__submenu'
                  
                >
                  <li 
                    key={index} 
                    style={{
                      display: hoveredElem === index && isHovered ? "block" : "none"
                    }}
                  >
                    <a> {element.submenu} </a>
                  </li>
                </ul>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header;