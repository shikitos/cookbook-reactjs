import React, { useState, useEffect } from 'react';
import './TextEditor.css';
import { EditorPopup } from '../';
import { ReactComponent as BoldSVG } from '../../utils/editor-bold.svg';
import { ReactComponent as ItalicSVG } from '../../utils/editor-italic.svg';
import { ReactComponent as AnchorSVG } from '../../utils/editor-anchor.svg';
import { ReactComponent as SpanSVG } from '../../utils/editor-span.svg';

const TextEditor = () => {

    const [editor, setEditor] = useState({
        tempValue: '',
        selectedValue: '',
        textareaValue: '',
        tempController: null,
        waitController: false,
        showContent: false,
        showPopUp: false
    });
    const headerBtns = [
        {
            dataType: "h1",
            elementName: "H1",
            elementClassName:  "tips-heading"
        },
        {
            dataType: "h2",
            elementName: "H2",
            elementClassName:  "tips-heading"
        },
        {
            dataType: "h3",
            elementName: "H3",
            elementClassName:  "tips-heading"
        },
        {
            dataType: "h4",
            elementName: "H4",
            elementClassName:  "tips-heading"
        },
        {
            dataType: "em",
            elementName: <ItalicSVG />,
        },
        {
            dataType: "a",
            elementName: <AnchorSVG />
        },
        {
            dataType: "span",
            elementName: <SpanSVG />
        },
        {
            dataType: "strong",
            elementName: <BoldSVG />
        },
    ];
    
    useEffect(() => {
        console.log(editor);
        if (editor.waitController && editor.tempController && editor.selectedValue) {
            let deleteOrAdd =  editor.selectedValue.includes(editor.tempController) ? true : false;
            console.log(deleteOrAdd);
            let tempStringFromArr = '';
            if (editor.tempController.length < 5) {
                tempStringFromArr = editor.tempValue.replace(editor.selectedValue, `<${editor.tempController} class="tips-heading">${editor.selectedValue}</${editor.tempController}>`);
                
            } else {
                tempStringFromArr = editor.tempValue.replace(editor.selectedValue, editor.tempController);
                console.log("INSIDE", tempStringFromArr);
            }
            console.log(`selectedValue: "${editor.selectedValue}", tempValue: "${editor.tempValue}", createdString: "${tempStringFromArr}"`);
            setEditor({ 
                tempValue: tempStringFromArr,
                selectedValue: '',
                textareaValue: tempStringFromArr,
                tempController: null,
                waitController: false
            });
        }
    
    }, [editor.selectedValue, editor.tempController]);
    
    const handleControllerClick = (e)  => {
        e.stopPropagation();
        e.preventDefault();
        if (e.currentTarget.dataset.type === 'a') {
            console.log('Controller clicked');
            setEditor({ ...editor, showPopUp: true, selectedValue: window.getSelection().toString() ? window.getSelection().toString() : null })
        } else {
            setEditor({ 
                ...editor, 
                selectedValue: window.getSelection().toString() ? window.getSelection().toString() : null, 
                tempController: e.currentTarget.dataset.type,
                waitController: true  
            }); 
        }
        
    }
    
    const changeClass = (e, state) => {
        e.preventDefault();
        setEditor({...editor, showContent: state})
    };
    
    const handleInput = (e) => {
        setEditor({ 
            ...editor,
            selectedValue: '',
            tempController: null,
            waitController: false,
            showContent: false,
            showPopUp: false, 
            tempValue: e.target.innerHTML 
        });
        console.log(e.target.innerHTML);
      };


    return (
        <div className='texteditor container'>
            {
                editor.showPopUp && 
                <EditorPopup 
                    selText={editor.selectedValue} 
                    onClick={e => setEditor({
                        ...editor, 
                        showPopUp: e.showPopUp, 
                        tempController: e.tempController, 
                        waitController: true 
                    })} 
                />
            }
            <div className="texteditor-header">
                <span 
                    className={editor.showContent ? 'texteditor-header__btn' : 'texteditor-header__btn active'}
                    onClick={e => changeClass(e, false)}
                >
                    Text Editor
                </span>
                <span 
                    className={editor.showContent ? 'texteditor-header__btn active' : 'texteditor-header__btn'}
                    onClick={e => changeClass(e, true)}
                >
                    View HTML
                </span>
            </div>
            {editor.showContent ? 
                <>
                    <div 
                        className={editor.textareaValue ? "texteditor-content" : "texteditor-content empty"}
                    >
                        {editor.textareaValue ? editor.textareaValue : "You need to add some text..."}
                    </div>
                </>
                :
                <>
                    <div 
                        className='texteditor-controls'
                    >
                        {headerBtns.map((value, index) => (
                            <>
                                <button 
                                    className='texteditor-controls__btn' 
                                    data-type={value.dataType}
                                    key={index}
                                    onClick={e => handleControllerClick(e)}
                                >
                                    {value.elementName}
                                </button>
                            </>
                        ))}
                    </div>
                    <div 
                        className='texteditor-inputarea'
                    >
                        <span
                            className='texteditor-inputarea__content'
                            contentEditable="true" 
                            onInput={handleInput}
                            dangerouslySetInnerHTML={
                            editor.textareaValue 
                                ? {__html: editor.textareaValue}
                                : {__html: "Hello! This is..."}
                            }
                        ></span>
                    </div>
                </>
            }
        </div>
    )
}

export default TextEditor