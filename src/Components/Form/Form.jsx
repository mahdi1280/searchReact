import React, {useState} from "react";
import './style.css';

export default function Form({handlerSaveUrlClick}) {
    const [text, changeText] = useState('');
    return <div className="form">
        <div className="logoSection">
            <img src="https://i.pinimg.com/originals/b8/1d/57/b81d57eef7c9a758a3982d5e5182e042.gif" alt="logo"/>
            <div>
                <h1 className="marginNone">RateWatch</h1>
                <h3 className="marginNone subHeader">View your site's keyword rankings in Google.</h3>
            </div>
        </div>

        <div className="saveSection">
            <input placeholder="search..." className="textBoxSave" required="true" value={text}
                   onChange={(e) => changeText(e.target.value)}
                   type="text"/>
            <button className="saveButton" onClick={(e) => {
                handlerSaveUrlClick(text);
                changeText('');
            }}>save
            </button>
        </div>
    </div>
}