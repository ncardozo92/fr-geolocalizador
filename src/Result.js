import React from "react"

export function Result(props){
    console.log(props)
    //let languages = props.languages.map(element => <li>`${element.name} (${element.code})`</li>)
    return(
        <div>
            <span>IP: {props.ip}</span>
            <span>Fecha: {props.date}</span>
            <span>País: {props.countryName}, ISO code: {props.countryCode}</span>
            <span>Distancia entre Buenos Aires (aprox.): {props.distance}</span>
            <span>Idiomas:</span>
        </div>
    )
}