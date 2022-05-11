import React from "react";

export default function Table({id,url,clickHandler,deleteHandler}){
    return <React.Fragment>
        <tr>
        <td aria-label="Job Title">
            {id}
        </td>
        <td aria-label="Location">{url}</td>
            <td>
                <button className="detailsButton viewButton" onClick={()=>clickHandler(id,url)}>View</button>
                <button className="detailsButton deleteButton" onClick={()=>deleteHandler(id)}></button>
            </td>
        </tr>
    </React.Fragment>
}