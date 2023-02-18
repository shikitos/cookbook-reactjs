import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { ReactComponent as LogoSVG } from '../../utils/logo-umai.svg';
import { ReactComponent as CheckSVG } from '../../utils/check.svg';
import { ReactComponent as HamburgerSVG } from '../../utils/hamburger.svg';
import { navElements } from '../../utils/constants';

const Header = () => {
    const [isHovered, setHover] = useState(false);
    const [hoveredElem, setHoveredElem] = useState(-1);
    const [isOpen, setIsOpen] = useState(true);
    const [screenWidth, setScreenWidth] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        function handleResize() {
            setScreenWidth(prev => prev = window.innerWidth);
          }
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, []);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    } 
  
    const handleClick = (e, path) => {
        e.preventDefault();
        console.log(e.target)
        navigate(path, { replace: true });
        window.scrollTo(0, 0);
        setIsOpen(true);
    }

    return (
        <header className='header container'>
            {
                screenWidth <= 1024 &&
                <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger">
                        <HamburgerSVG />
                    </div>
                </div>
            }
            <div 
                className='header-logo'
                onClick={(e) => handleClick(e, '/')}
            >
                <LogoSVG />
            </div>
            <nav className={`header-nav ${isOpen ? '' : 'open'}`}>
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
                                <CheckSVG />
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
                {
                    screenWidth <= 1024 &&
                    <div className={`menu-toggle__close ${isOpen ? '' : 'open'}`} onClick={toggleMenu}>
                        <div className="hamburger-close">
                            &#215;
                        </div>
                    </div>
                }
            </nav>
            
        </header>
    )
}

export default Header;