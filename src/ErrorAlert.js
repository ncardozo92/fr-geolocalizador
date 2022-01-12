import React from "react";

export function ErrorAlert(props){
    return(
        <div role="alert" className="alert alert-warning">{props.message}</div>
    )
}