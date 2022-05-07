import React,{useState} from "react";
import './style.css';

export default function Form({handlerSaveUrlClick}){
    const [text,changeText] = useState('');
    return <div className="form">
        <input className="textBoxSave" required="true" value={text} onChange={(e)=>changeText(e.target.value)} type="text"/>
        <button className="saveButton" onClick={(e)=>{
            handlerSaveUrlClick(text);
            changeText('');
        }}>save</button>
    </div>
}