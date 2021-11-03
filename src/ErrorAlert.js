import React from "react";

export function ErrorAlert(props){
    return(
        <div className="alert alert-warning">{props.message}</div>
    )
}