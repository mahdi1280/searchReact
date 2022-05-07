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
                <button className="detailsButton viewButton" onClick={()=>clickHandler(id)}>Chart</button>
                <button className="deleteButton" onClick={()=>deleteWordHandler(id)}></button>
                <button className="refreshButton" onClick={()=>deleteWordHandler(id)}></button>
            </td>
        </tr>
    </React.Fragment>
}