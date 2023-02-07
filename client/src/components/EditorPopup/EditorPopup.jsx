import React, {useState, useRef, useEffect} from 'react';
import './EditorPopup.css';

const EditorPopup = (props) => {
    const [anchor, setAnchor] = useState({
        target: '_self',
        url: '',
        text: ''
    });
    const popupRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                props.onClick({toggle: false})
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.selText);
        console.log(anchor.text);
        if (props.selText) {
            props.onClick({tempController: `<a href="${anchor.url}" target="${anchor.target}">${props.selText}</a>`});
        }
        if (anchor.text) {
            props.onClick({tempController: `<a href="${anchor.url}" target="${anchor.target}">${anchor.text}</a>`});
        }
    }
    

    return (
        <div className='popup' ref={popupRef}>
            <div
                className='popup-data'
            >
                <input 
                    type="url" 
                    value={anchor.url} 
                    onChange={e => setAnchor({...anchor, url: e.target.value})} 
                    className=""
                    placeholder='URL'
                />
                <input 
                    type="text" 
                    className=""
                    placeholder='Text'
                    value={ props.selText || anchor.text || "" }  
                    onChange={e => setAnchor({...anchor, text: e.target.value})} 
                />
                <input 
                    type="checkbox" 
                    name='target' 
                    value={false} 
                    className="" 
                    onChange={e => setAnchor({...anchor, target: e.target.value ? "_blank" : "_self"})} 
                />
                <label 
                    for={"target"}
                >
                    Open in new tab
                </label>
                <button 
                    onClick={e => handleSubmit(e)}
                >
                    Insert
                </button>
            </div>
            <span
                className='popup-close'
                onClick={e => props.onClick({toggle: false})}
            >
                &#215;
            </span>
        </div>
    )
}

export default EditorPopup;