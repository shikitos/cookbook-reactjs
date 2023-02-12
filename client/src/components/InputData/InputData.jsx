import React, { useState, useEffect, useRef } from 'react';
import './InputData.css'

const InputData = (props) => {
    const [element, setElement] = useState(0);
    const [additionalInput, setAdditionalInput] = useState(1);
    const [arrayOfInputs, setArrayOfInputs] = useState([]);
    const [stringOfInputs, setStringOfInputs] = useState('');
    const [closeButtonStyle, setCloseButtonStyle] = useState('');
    const [temp, setTemp] = useState(0);
    const [state, setState] = useState('');
    const textArea = useRef([]);
    const textareaWrapper = useRef([]);
    
    useEffect(() => {
        if (props.element === 'input') {
            setElement(0);
        } else if (props.element === 'textarea') {
            setElement(1);
            if (props.recipeArrayItemsCreated) {
                setAdditionalInput(props.recipeArrayItemsCreated);
            }
        } else {
            throw new Error('Invalid input type. It must be either input or textarea.');
        }
        

    }, []);
    
    useEffect(() => {
        if (props.array && props.recipeArrayItemsCreated > 1) {
            setArrayOfInputs(props.defaultValue);
        }
    }, )

    
    const handleTextareaOnFocus = (textarea, focused) => {
        if (focused) {
            textarea.style.height = props.sizeOnFocus;
            textarea.style.height = ( 25 + textarea.scrollHeight ) + "px";
        } else {
            textarea.style.height = props.sizeOnFocus;
        }
        setCloseButtonStyle(`${(textarea.style.height.substring(0, textarea.style.height.length - 2) / 2) - 10}px`);
    }
    
    const handleOnChangeComplexInput = (e, key, index, type, isInput) => {
		if (props.array) {
		    let newArrayOfInputs = [...arrayOfInputs];
            newArrayOfInputs[index] = type === "text" ? e.target.value : parseInt(e.target.value);
            setArrayOfInputs(newArrayOfInputs);
		    props.onChange(newArrayOfInputs);
		} else {
		    if (isInput) {
		        setStringOfInputs(type === "text" ? e.target.value : parseInt(e.target.value));
		        props.onChange(stringOfInputs);
		    } else {
		        let tempString = e.target.value;
                setStringOfInputs(tempString);
		        props.onChange(tempString);
		    }
		}
        return e.target.value;
	}
	
	const handleOnKeyDown = (e) => {
	    if (e.code === "Enter" && !e.shiftKey && props.array) {
	        e.preventDefault();
	        setAdditionalInput(input => input + 1);
	        setTimeout(() => {
                let arrayOfTextareaElements = Array.from(textareaWrapper.current.children).filter(node => node.className === "inputdata-textarea_wrapper");
                arrayOfTextareaElements[arrayOfTextareaElements.length - 1].children[0].focus();
              }, 0);
	    } 
	}
    
    const handleAdd = (e) => {
        e.preventDefault();
        setAdditionalInput(input => input + 1);
    }
    
    const handleCloseElement = (e, index) => {
        e.preventDefault();
        console.log("Delete element №: " + index, "element content: " + arrayOfInputs[index])
	    setAdditionalInput(input => input - 1);
        let newArrayOfInputs = [...arrayOfInputs];
        newArrayOfInputs.splice(index, 1);
        setArrayOfInputs(newArrayOfInputs);
        props.onChange(newArrayOfInputs);
        e.target.value = '';
    }
    

    const fillComplexInput = (data, index) => {
        if (props.array && props.recipeArrayItemsCreated > 1) {
            return arrayOfInputs[index]
        } else {
            return data;
        }
    }
    
    

    return (
        <>
            {element === 0 ? (
                <>
                    <div className={props.elementName + ' inputdata-container' + (props.divider && !props.lastChild ? ' divided' : '')} >
                    {
                        Array.from({ length: additionalInput }).map((key, index) => (
                            <>
                                {
                                    additionalInput.length > 1 ? 
                                    ''
                                    : 
                                    <p className="inputdata-title" key={index + 10}>{props.title}</p>
    
                                }
                                <input
                                    className="inputdata-field"
                                    type={props.type}
                                    onFocus={e => handleTextareaOnFocus(e.target, true)}
                                    onBlur={e => handleTextareaOnFocus(e.target, false)}
                                    min={props.type === 'number' ? 0 : ''}
                                    max={props.type === 'number' ? 5 : ''}
                                    placeholder={props.placeholder}
        							onChange={(e) => handleOnChangeComplexInput(e, index, props.type, true)}
        							defaultValue = {props.defaulValue}
        							key={index + 1}
        							disabled={props.disabled}
                                />
                            </>
                        ))
                    }
                    {
                        props.array && 
                        <button className='inputdata-button' onClick={e => handleAdd(e)}>
                            +
                        </button>
                    }
                    </div>
                </>
            ) : (
                <div  ref={textareaWrapper} className={props.elementName + ' inputdata-container' + (props.divider && !props.lastChild ? ' divided' : '')}>
                    {
                        Array.from({ length: additionalInput }).map((key, index) => (
                            <>
                                {
                                    index >= 1 ? 
                                    ''
                                    : 
                                    <p className="inputdata-title" key={index + 15}>{props.title}</p>
                                }
                                <div className='inputdata-textarea_wrapper'>
                                    <textarea 
                                        className="inputdata-field"
                                        type={props.type} 
                                        onFocus={e => handleTextareaOnFocus(e.target, true)}
                                        onBlur={e => handleTextareaOnFocus(e.target, false)}
                                        placeholder={props.placeholder}
                                        onChange={(e) => {handleOnChangeComplexInput(e, props.elementName, index, props.type)}}
                                        onKeyDown={e => handleOnKeyDown(e)}
    							        key={index}
    							        disabled={props.disabled}
    							        value={fillComplexInput(props.defaultValue, index)}
                                        ref={textArea}
						            />
                                    {
                                    index === 0 ? 
                                    ''
                                    : 
                                    <span 
                                        className="inputdata-close" 
                                        data-related-input={index} 
                                        onClick={e => handleCloseElement(e, index)}
                                        key={index + 20}
                                        style={{top: closeButtonStyle}} 
                                    >
                                        &#215;
                                    </span>
                                    }
                                </div>
                                

                            </>
                        ))
                    }   
                {
                    props.array && 
                    <button className='inputdata-button' onClick={e => handleAdd(e)}>
                        +
                    </button>
                }
                </div>
            )}
        </>
    );
};

export default InputData;
