import React from "react";

export default function WordTableHeader() {
    return <thead>
    <th>#</th>
    <th>word</th>
    <th>level</th>
    <th>rate</th>
    <th>Details<button className="refreshAll"></button></th>
    </thead>
}