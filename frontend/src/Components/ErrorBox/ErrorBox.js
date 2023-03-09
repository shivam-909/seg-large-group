import React from "react";

export default function ErrorBox(props) {
    return (
        <div id="errorBox" className="invisible absolute top-96">
            <div className="border-2 border-red bg-light-red rounded-md p-2 flex items-center justify-center">
                {props.message}
            </div>
        </div>
    );
}