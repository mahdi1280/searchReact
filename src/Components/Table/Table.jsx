import React from "react";

export default function Table({id,url,clickHandler,deleteHandler}){
    return <React.Fragment>
        <tr>
        <td aria-label="Job Title">
            {id}
        </td>
        <td aria-label="Location">{url}</td>
            <td>
                <button onClick={()=>clickHandler(id)}>details</button>
                <button onClick={()=>deleteHandler(id)}>delete</button>
            </td>
        </tr>
    </React.Fragment>
}