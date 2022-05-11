import React,{useState} from "react";

export default function TableWord({id,url,levelRate,level,deleteWordHandler,onceRefresh,refreshId,showChart}){
    const [trClassName,setTrClassName] = useState('');
    if(refreshId && trClassName !=='' && refreshId.indexOf(id)<0){
        setTrClassName('');
        console.log(1);
        console.log(refreshId);
    }
    return <React.Fragment>
        <tr className={trClassName}>
            <td aria-label="Job Title">
                {id}
            </td>
            <td aria-label="Location">{url}</td>
            <td aria-label="Location">{level!==0 ? level : 'Not Found Data!'}</td>
            <td aria-label="Location">{levelRate!== 0 ?levelRate: 'Not Found Data!'}</td>
            <td>
                <button className="detailsButton viewButton"  onClick={()=>showChart(id)}>Chart</button>
                <button className="deleteButton" onClick={()=>deleteWordHandler(id)}></button>
                <button className={`refreshButton ${trClassName!== '' && 'rotate'}`} onClick={()=>{setTrClassName('trRefresh');onceRefresh(id)}}></button>
            </td>
        </tr>
    </React.Fragment>
}