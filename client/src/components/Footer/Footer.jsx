import React from 'react';
import { useNavigate } from "react-router-dom";
import './Footer.css';
import { ReactComponent as LinkedInIcon} from '../../utils/linkedin.svg';
import { ReactComponent as TelegramIcon} from '../../utils/telegram.svg';
import { ReactComponent as GitHubIcon} from '../../utils/github.svg';
import { ReactComponent as InstagramIcon} from '../../utils/instagram.svg';


const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='footer'>
            <div className="footer-wrapper container">
                <div className='footer-contact'>
                    <h2>Offices and Contacts</h2>
                    <div className='footer-contact__main'>
                        <div className='footer-contact__line'>
                            <h3>Prague</h3>
                            <p>Pernerova 124/34, 186 00 Prague 8 - Karlín, Czechia</p>
                        </div>
                        <div className='footer-contact__line'>
                            <h3>For Contact</h3>
                            <a href='tel:+420703998279'>703-998-279</a>
                            <br />
                            <a href='mailto:shitovn16@gmail.com'>shitovn16@gmail.com</a>
                        </div>
                        <div className='footer-contact__line'>
                            <h2>Follow Me</h2>
                            {/* <div>INST ICONS</div> */}
                            <div className="footer-line__icons">
                                <a href="https://www.linkedin.com/in/nikitashitov/" rel='noreferrer' target='_blank'><LinkedInIcon /></a>
                                <a href="https://t.me/Shikitos" rel='noreferrer' target='_blank'><TelegramIcon /></a>
                                <a href="https://github.com/shikitos/" rel='noreferrer' target='_blank'><GitHubIcon /></a>
                                <a href="https://www.instagram.com/shikitos/" rel='noreferrer' target='_blank'><InstagramIcon /></a>
                            </div>
                        </div>
                        <div className='footer-contact__line'>
                            
                        </div>
                    </div>
                    
                </div>
                <div className='footer-content'>
                    <h2>Services</h2>
                    <div className='footer-content__main'>
                        <div className='footer-content__column'>
                            <h3>ACTIONS</h3>
                            <ul>
                                <li onClick={e => navigate('create-recipe/')}>
                                    Create New Recipe
                                </li>
                                <li onClick={e => navigate('edit-recipe/')}>
                                    Edit Recipe
                                </li>
                                <li onClick={e => navigate('support/')}>
                                    Contact Support
                                </li>
                                <li onClick={e => navigate('/')}>
                                    Main Page
                                </li>
                                <li onClick={e => navigate('about/')}>
                                    About
                                </li>
                            </ul>
                        </div>
                        <div className='footer-content__column'>
                            <h3>DETAILS</h3>
                            <ul>
                                <li onClick={e => navigate('contact/')}>
                                    Contact
                                </li>
                                <li onClick={e => navigate('privacy-policy/')}>
                                    Privacy Policy
                                </li>
                                <li onClick={e => navigate('terms-condition/')}>
                                    Terms And Conditions
                                </li>
                                <li onClick={e => navigate('callaborate/')}>
                                    Collaborate
                                </li>
                                <li onClick={e => navigate('content-permissions/')}>
                                    Content Permissions
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='footer-rules'>
                    <p>&copy; Made by: <span>Nikita Shitov</span> (part of the design, recipes, and idea taken from <a href='https://www.justonecookbook.com/'><em>justonecookbook</em></a>), {new Date().getFullYear()} year</p>
                </div>
                
            </div>
            
        </footer>

    )
}

export default Footer;