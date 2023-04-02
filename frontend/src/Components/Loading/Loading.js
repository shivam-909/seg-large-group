import React from "react";
import './Loading.css';
export default function Loading(props) {
    return (
        <div className={"loader "+props.className} role="loader"/>
    );
}
