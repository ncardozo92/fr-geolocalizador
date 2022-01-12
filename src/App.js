import react, {Component} from 'react';
import axios from "axios";
import { Result } from './Result';
import { ErrorAlert } from './ErrorAlert';

import "./App.css";

class App extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    "geodata": null,
    "error": null
  }

  handleSubmit(event){
    event.preventDefault();

    this.setState({error: null});

    axios.get(`http://localhost:8080/api/${event.target.elements.ip.value}`)
    .then(response =>{
      if(response.status <= 400){
        console.log("Respuesta recibida: " + response);
        this.setState({geodata: response.data})
      } else {
        this.setState({error: `Se recibió un status ${response.status}`});
      }
    })
    .catch(err => {
      console.log("Error: ",err);
      this.setState({error: "Ocurrió un error en la conexión con la api"});
    });
  }

  render(){
    const geodata = this.state.geodata;
    console.log(geodata);
    let mappedLanguages = [];

    // if(this.state.geodata != null){
    //   mappedLanguages = this.state.geodata.languages.map(element => <li className="language" key={element.code}>{element.name} ({element.code})</li>);
    // }

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="ip" id="ip" placeholder="192.168.0.1"/>
          <button id="submit" name="submit">Rastrear</button>
        </form>
        { this.state.error ? <ErrorAlert message={this.state.error} /> : null }
        { geodata ?
            // <div className="results">
            //   <span className="ip">IP: {this.state.geodata.ip}</span><br/>
            //   <span className="date">Fecha: {this.state.geodata.date}</span><br/>
            //   <span className="country">País: {this.state.geodata.country_name}, ISO code: {this.state.geodata.country_code}</span><br/>
            //   <span className="distance">Distancia entre Buenos Aires (aprox.): {this.state.geodata.distance} KM</span><br/>
            //   <span>Idiomas:</span>
            //   <ul>
            //     {mappedLanguages}
            //   </ul>
            // </div> 
            <Result ip={geodata.ip} date={geodata.date} countryName={geodata.country_name} countryCode={geodata.country_code} distance={geodata.distance}/> :
            null }
      </div>
    );
  }
}

export default App;
