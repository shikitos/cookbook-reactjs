import React, { useState, useEffect } from 'react';
import './InputData.css'

const InputData = (props) => {
    const [element, setElement] = useState(0);
    const [additionalInput, setAdditionalInput] = useState(1);
    const [arrayOfInputs, setArrayOfInputs] = useState([]);
    const [stringOfInputs, setStringOfInputs] = useState('');

    useEffect(() => {
        if (props.element === 'input') {
            setElement(0);
        } else if (props.element === 'textarea') {
            setElement(1);
        } else {
            throw new Error('Invalid input type');
        }
    }, []);
    
    const handleTextareaOnFocus = (textarea, focused) => {
        if (focused) {
            textarea.style.height = props.sizeOnFocus;
            textarea.style.height = ( 25 + textarea.scrollHeight ) + "px";
        } else {
            textarea.style.height = props.sizeOnFocus;
        }
    }
    
    const handleOnChangeComplexInput = (e, key, index, type) => {
        setArrayOfInputs([]);
		if (props.array) {
		    let newArrayOfInputs = [...arrayOfInputs];
            newArrayOfInputs[index] = type === "text" ? e.target.value : parseInt(e.target.value);
            setArrayOfInputs(newArrayOfInputs);
		    props.onChange(arrayOfInputs);
		} else {
		    setStringOfInputs(type === "text" ? e.target.value : parseInt(e.target.value));
		    props.onChange(stringOfInputs);
		}
	}
    
    const handleAdd = (e) => {
        e.preventDefault();
        setAdditionalInput(additionalInput + 1);
    }

    return (
        <>
            {element === 0 ? (
                <div className={props.elementName}>
                {
                    Array.from({ length: additionalInput }).map((key, index) => (
                        <input
                            className={props.className}
                            type={props.type}
                            onFocus={e => handleTextareaOnFocus(e.target, true)}
                            onBlur={e => handleTextareaOnFocus(e.target, false)}
                            value={props.value}
                            placeholder={props.placeholder}
							onChange={(e) => handleOnChangeComplexInput(e, props.elementName, index, props.type)}
                        />
                    ))
                }
                {
                    props.array && 
                    <button className='' onClick={e => handleAdd(e)}>
                        +
                    </button>
                }
                </div>
            ) : (
                <div className={props.elementName}>
                    {
                        Array.from({ length: additionalInput }).map((key, index) => (
                            <textarea 
                                type={props.type} 
                                onFocus={e => handleTextareaOnFocus(e.target, true)}
                                onBlur={e => handleTextareaOnFocus(e.target, false)}
                                value={props.value}
                                placeholder={props.placeholder}
                                onChange={(e) => handleOnChangeComplexInput(e, props.elementName, index, props.type)}
                            />
                        ))
                    }   
                {
                    props.array && 
                    <button className='' onClick={e => handleAdd(e)}>
                        +
                    </button>
                }
                </div>
            )}
        </>
    );
};

export default InputData;
