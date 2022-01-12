import React from "react"

export function Result(props){
    console.log(props)
    //let languages = props.languages.map(element => <li>`${element.name} (${element.code})`</li>)
    return(
        <div>
            <span className="ip-data">IP: {props.ip}</span>
            <span className="ip-data">Fecha: {props.date}</span>
            <span className="ip-data">País: {props.countryName}, ISO code: {props.countryCode}</span>
            <span className="ip-data">Distancia entre Buenos Aires (aprox.): {props.distance}</span>
        </div>
    )
}