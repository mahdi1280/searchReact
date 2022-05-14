import React, {useState} from "react";
import './style.css';

export default function FormWord({handlerSaveUrlClick}) {
    const [locationFlag, setLocationFlag] = useState(false);
    const [deviceFlag, setDeviceFlag] = useState(false);
    function locationHandler() {
        setLocationFlag((s) => !s)
        if(locationFlag){
            setDeviceFlag(false);
        }
    }

    const [text, changeText] = useState('');
    return <div className="formWord">
        <div className="saveSection">
            <button className="dropDownButton" onClick={locationHandler}></button>
            <input placeholder="word" className="textBoxSave" required="true" value={text}
                   onChange={(e) => changeText(e.target.value)}
                   type="text"/>
            <button className="saveButton" onClick={(e) => {
                handlerSaveUrlClick(text);
                changeText('');
            }}>Save Word
            </button>
        </div>
        {locationFlag &&
            <div className="saveSection">
                <button className="dropDownButton" onClick={() => setDeviceFlag((f) => !f)}></button>
                <input placeholder="Location" className="textBoxSave" type="text"/>
            </div>
        }
        {deviceFlag &&
            <div className="saveSection">
                <input placeholder="Device" className="textBoxSave" type="text"/>
            </div>
        }

    </div>
}