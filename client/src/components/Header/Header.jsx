import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../../utils/logo-umai.svg';
import check from '../../utils/check.svg';
import { navElements } from '../../utils/constants';

const Header = () => {
    const [isHovered, setHover] = useState(false);
    const [hoveredElem, setHoveredElem] = useState(-1);
    let navigate = useNavigate();
  
    const  handleClick = (e, path) => {
        e.preventDefault();
        console.log('handleClick', path);
        navigate(path, { replace: true });
    }

    return (
        <header className='header container'>
            <div 
                className='header-logo'
                onClick={(e) => handleClick(e, '/')}
            >
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
                            {element.title}
                            <button className="header-nav__button">
                                <img src={check} alt="Submenu navbar"/>
                            </button>
                            <ul 
                                className='header-nav__submenu'
                                style={{
                                    display: hoveredElem === index && isHovered ? "block" : "none"
                                }}
                            >
                            {
                                element.submenu.map((subitem, subitemIndex) => (
                                    <li 
                                        key={subitemIndex} 
                                        onClick={(e) => handleClick(e, subitem.href)}
                                    >
                                    {subitem.name}
                                    </li>
                                ))
                            }
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