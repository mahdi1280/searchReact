import React, {useEffect, useState} from "react";
import "./style.css";
import Table from './Components/Table';
import Spinner from './Spinner-1s-200px.gif';
import UrlTableHeader from './Components/UrlTableHeader';
import WordTableHeader from './Components/WordTableHeader';
import TableWord from "./Components/TableWord";
import Form from "./Components/Form";

export default function App() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState(true);
    const [url, setUrl] = useState("http://localhost:8080/domain");
    const [stateDomain, setStateDomain] = useState(true);
    const [domainId, setDomainId] = useState(0);

    function clickHandler(id) {
        setSearch(true);
        setUrl(`http://localhost:8080/word/domain/${id}`);
        setDomainId(id);
        setStateDomain(false);
    }

    function backClick() {
        setUrl("http://localhost:8080/domain");
        setStateDomain(true);

    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setSearch(false);
                setData(response)
            });
    }, [url])

    function handlerSaveUrlClick(text) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: text})
        };
        fetch('http://localhost:8080/domain', requestOptions)
            .then(() => {
                setSearch(true);
                setUrl("http://localhost:8081/domain");
                setUrl("http://localhost:8080/domain");
            })
    }

    function handlerSaveWordClick(text) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({domainId: domainId, title: text})
        };
        fetch('http://localhost:8080/word', requestOptions)
            .then(() => {
                setSearch(true);
                setUrl(`http://localhost:8081/word/domain/${domainId}`);
                setUrl(`http://localhost:8080/word/domain/${domainId}`);
            })
    }

    function deleteHandler(id){
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:8080/domain/${id}`, requestOptions)
            .then(() => {
                setSearch(true);
                setUrl("http://localhost:8081/domain");
                setUrl("http://localhost:8080/domain");
            })
    }

    function deleteWordHandler(id){
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:8080/word/${id}`, requestOptions)
            .then(()=> {
                setSearch(true);
                setUrl(`http://localhost:8081/word/domain/${domainId}`);
                setUrl(`http://localhost:8080/word/domain/${domainId}`);
            })
    }

    const rows = data.map(row => {
        if (row.message) {
            return <p>{row.message}</p>
        }
        if (row.url) {
            return <Table deleteHandler={deleteHandler} clickHandler={clickHandler} key={row.id} id={row.id} url={row.url}/>
        }
        return <TableWord deleteWordHandler={deleteWordHandler} clickHandler={clickHandler} key={row.id} id={row.id} url={row.title} level={row.level}
                          levelRate={row.levelRate}/>;
    });
    return <React.Fragment>
        {stateDomain && <Form handlerSaveUrlClick={handlerSaveUrlClick}/>}
        {!stateDomain && <Form handlerSaveUrlClick={handlerSaveWordClick}/>}
        <table>
            {stateDomain && <UrlTableHeader/>}
            {!stateDomain && <WordTableHeader/>}
            <tbody>
            {!search && rows}
            </tbody>
        </table>
        <div className="loader">
            {search && <img src={Spinner} alt="loader"/>}
        </div>
        <div>
            {!stateDomain && <button onClick={backClick}>back</button>}
        </div>
    </React.Fragment>
}