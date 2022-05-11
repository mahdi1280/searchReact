import React, {useEffect, useState} from "react";
import "./style/style.css";
import Table from './Components/Table';
import Spinner from './style/svg/Magnify-1.9s-231px.gif';
import UrlTableHeader from './Components/UrlTableHeader';
import WordTableHeader from './Components/WordTableHeader';
import TableWord from "./Components/TableWord";
import Form from "./Components/Form";
import MyChart from "./Components/MyChart";

export default function App() {

    const [data1, setData] = useState([]);
    const [search, setSearch] = useState(true);
    const [url, setUrl] = useState("http://127.0.0.1:8080/domain");
    const [stateDomain, setStateDomain] = useState(true);
    const [domainId, setDomainId] = useState(0);
    const [domain, setDomain] = useState();
    const [refreshId, setRefreshId] = useState([]);
    const [chartData, setChartData] = useState();
    const [wordId, setWordId] = useState();

    function clickHandler(id, url) {
        setSearch(true);
        setUrl(`http://127.0.0.1:8080/word/domain/${id}`);
        setDomain(url);
        setDomainId(id);
        setStateDomain(false);
    }

    function backClick() {
        setUrl("http://127.0.0.1:8080/domain");
        setStateDomain(true);
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setSearch(false);
                setData(response)
            }).catch(console.log);
    }, [url])


    function handlerSaveUrlClick(text) {
        const requestOptions = {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: text})
        };
        fetch('http://127.0.0.1:8080/domain', requestOptions)
            .then(() => {
                setSearch(true);
                setUrl("http://127.0.0.1:8081/domain");
                setUrl("http://127.0.0.1:8080/domain");
            })
    }

    function handlerSaveWordClick(text) {
        const requestOptions = {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({domainId: domainId, title: text})
        };
        fetch('http://127.0.0.1:8080/word', requestOptions)
            .then(() => {
                setSearch(true);
                setUrl(`http://127.0.0.1:8081/word/domain/${domainId}`);
                setUrl(`http://127.0.0.1:8080/word/domain/${domainId}`);
            })
    }

    function arrayRemove(arr, value) {
        return arr.filter(function (geeks) {
            return geeks !== value;
        });
    }

    function onceRefresh(wordId) {
        setRefreshId((r) => [...r, wordId]);
        fetch(`http://127.0.0.1:8080/word/${wordId}/domain/${domainId}`, {
            crossDomain: true
        })
            .then((response) => {
                return response.json();
            }).then((response) => {
            setData(response)
            setRefreshId(arrayRemove(refreshId, wordId))
        });
    }

    function refreshAll() {
        setSearch(true);
        fetch(`http://127.0.0.1:8080/word/refreshAll/refresh/domain/${domainId}`)
            .then((response) => {
                return response.json();
            }).then((response) => {
            setData(response)
            setSearch(false);
        });
    }

    function deleteHandler(id) {
        const requestOptions = {

            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://127.0.0.1:8080/domain/${id}`, requestOptions)
            .then(() => {
                setSearch(true);
                setUrl("http://127.0.0.1:8081/domain");
                setUrl("http://127.0.0.1:8080/domain");
            })
    }

    function deleteWordHandler(id) {
        const requestOptions = {

            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`http://127.0.0.1:8080/word/${id}`, requestOptions)
            .then(() => {
                setSearch(true);
                setUrl(`http://127.0.0.1:8081/word/domain/${domainId}`);
                setUrl(`http://127.0.0.1:8080/word/domain/${domainId}`);
            })
    }

    function showChart(id,index) {

        if (!chartData) {
            fetch(`http://127.0.0.1:8080/word/${id}`)
                .then((response) => {
                    return response.json();
                }).then((response) => {
                setChartData(response);
                setWordId(id);
                window.scrollTo(0, (50 * (index+1))+260);
            });
        } else {
            setChartData();
        }
    }

    const rows = data1.map((row,index) => {
        if (row.message) {
            return <p className="errorCode">{row.message}</p>
        }
        if (row.url) {
            return <Table deleteHandler={deleteHandler} clickHandler={clickHandler} key={row.id} id={row.id}
                          url={row.url}/>
        }
        return <React.Fragment><TableWord index={index} showChart={showChart} refreshId={refreshId}
                                          deleteWordHandler={deleteWordHandler} onceRefresh={onceRefresh} key={row.id}
                                          id={row.id} url={row.title}
                                          level={row.level}
                                          levelRate={row.levelRate}/> {(chartData && wordId === row.id) ?
            <MyChart chartLabel={row.title} chartData={chartData}/> : null}</React.Fragment>;
    });
    return <React.Fragment>
        {stateDomain && <Form handlerSaveUrlClick={handlerSaveUrlClick}/>}
        {!stateDomain && <Form handlerSaveUrlClick={handlerSaveWordClick}/>}
        {domain && <p className="urlName">Target: {domain}</p>}
        <table>
            {stateDomain && <UrlTableHeader/>}
            {!stateDomain && <WordTableHeader refreshAll={refreshAll}/>}
            <tbody>
            {!search && rows}
            </tbody>
        </table>
        <div className="loader">
            {search && <img src={Spinner} alt="loader"/>}
        </div>
        <div>
            {!stateDomain && <button className="backButton" onClick={backClick}></button>}
        </div>
        <div className="footer">
            <h6><a href="http://www.github.com/mahdi1280">DEV.MK 🤏</a></h6>
        </div>
    </React.Fragment>
}