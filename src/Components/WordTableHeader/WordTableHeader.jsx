import React from "react";

export default function WordTableHeader({refreshAll}) {
    return <thead>
    <th>#</th>
    <th>word</th>
    <th>level</th>
    <th>rate</th>
    <th>Details<button onClick={refreshAll} className="refreshAll"></button></th>
    </thead>
}