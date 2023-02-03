import React, { useState, useEffect, useRef } from 'react';
import './InputData.css'

const InputData = (props) => {
    const [element, setElement] = useState(0);
    const [additionalInput, setAdditionalInput] = useState(1);
    const [arrayOfInputs, setArrayOfInputs] = useState([]);
    const [stringOfInputs, setStringOfInputs] = useState('');
    const [closeButtonStyle, setCloseButtonStyle] = useState('');
    const textArea = useRef([]);

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
    
    /*useEffect(() => {
        console.log("@@@@@@@@@",textArea.current.value)
    
        if (textArea.current.value) {
        
            if (props.array) {
                //let newArrayOfInputs = [...arrayOfInputs];
                setArrayOfInputs(arr => [...arr, textArea.current.value]);
                console.log(props.elementName, arrayOfInputs)
            } 
        }
    }, [])*/

    
    const handleTextareaOnFocus = (textarea, focused) => {
        if (focused) {
            textarea.style.height = props.sizeOnFocus;
            textarea.style.height = ( 25 + textarea.scrollHeight ) + "px";
        } else {
            textarea.style.height = props.sizeOnFocus;
        }
        setCloseButtonStyle(`${(textarea.style.height.substring(0, textarea.style.height.length - 2) / 2) - 10}px`);
    }
    
    const handleOnChangeComplexInput = (e, key, index, type) => {
        console.log(e.target.value);
        setArrayOfInputs([]);
		if (props.array) {
		    let newArrayOfInputs = [...arrayOfInputs];
            newArrayOfInputs[index] = type === "text" ? e.target.value : parseInt(e.target.value);
            console.log("HERE", newArrayOfInputs);
            setArrayOfInputs(newArrayOfInputs);
		    props.onChange(arrayOfInputs);
		} else {
		    setStringOfInputs(type === "text" ? e.target.value : parseInt(e.target.value));
		    props.onChange(stringOfInputs);
		}
	}
	
	const handleOnKeyDown = (e) => {
	    if (e.code === "Enter" && !e.shiftKey && props.array) {
	        e.preventDefault();
	        setAdditionalInput(additionalInput + 1);
	    } 
	}
    
    const handleAdd = (e) => {
        e.preventDefault();
        setAdditionalInput(additionalInput + 1);
    }
    
    const handleCloseElement = (e, index) => {
        e.preventDefault();
        setAdditionalInput(additionalInput - 1);
        console.log("ARR INDEX", index);
        const indexToRemove = arrayOfInputs.indexOf(index);
            setArrayOfInputs(arr => arr.splice(indexToRemove, 1)); // 2nd parameter means remove one item only
        props.onChange(arrayOfInputs);
        console.log("NEW arr", arrayOfInputs);
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
                                    <p className="inputdata-title" key={key + "inputTitleName" + index}>{props.title}</p>
    
                                }
                                <input
                                    className="inputdata-field"
                                    type={props.type}
                                    onFocus={e => handleTextareaOnFocus(e.target, true)}
                                    onBlur={e => handleTextareaOnFocus(e.target, false)}
                                    min={props.type === 'number' ? 0 : ''}
                                    max={props.type === 'number' ? 5 : ''}
                                    placeholder={props.placeholder}
        							onChange={(e) => handleOnChangeComplexInput(e, props.elementName, index, props.type)}
        							defaultValue = {props.defaulValue}
        							key={key  + "input" + index}
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
                <div className={props.elementName + ' inputdata-container' + (props.divider && !props.lastChild ? ' divided' : '')}>
                    {
                        Array.from({ length: additionalInput }).map((key, index) => (
                            <>
                                {
                                    index >= 1 ? 
                                    ''
                                    : 
                                    <p className="inputdata-title" key={key + "titleTeaxtareName"}>{props.title}</p>
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
    							        key={key + "textareaInput" + index}
    							        disabled={props.disabled}
    							        defaultValue={fillComplexInput(props.defaultValue, index)}
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
                                        key={key + "closeTag" + index}
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
