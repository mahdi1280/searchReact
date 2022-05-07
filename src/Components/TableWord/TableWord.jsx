import React from "react";

export default function TableWord({id,url,clickHandler,levelRate,level,deleteWordHandler}){
    return <React.Fragment>
        <tr>
            <td aria-label="Job Title">
                {id}
            </td>
            <td aria-label="Location">{url}</td>
            <td aria-label="Location">{level}</td>
            <td aria-label="Location">{levelRate}</td>
            <td>
                <button onClick={()=>clickHandler(id)}>details</button>
                <button onClick={()=>deleteWordHandler(id)}>delete</button>
            </td>
        </tr>
    </React.Fragment>
}