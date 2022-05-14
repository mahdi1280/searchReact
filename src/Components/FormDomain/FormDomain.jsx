import React, {useState} from "react";
import './style.css';

export default function FormDomain({handlerSaveUrlClick}) {
    const [text, changeText] = useState('');
    return <div className="formWord"><div className="saveSection">
        <input placeholder="google.com,rozesa.com,.." className="textBoxSave" required="true" value={text}
               onChange={(e) => changeText(e.target.value)}
               type="text"/>
        <button className="saveButton" onClick={(e) => {
            handlerSaveUrlClick(text);
            changeText('');
        }}>Save Domain
        </button>
    </div>
    </div>
}