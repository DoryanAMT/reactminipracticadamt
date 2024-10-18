import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class Jugadores extends Component {

    state = { 
        jugadores: []
     }

     loadJugadores = () => {
        let idEquipo = this.props.idequipo;
        console.log(idEquipo);
        let request = "api/Jugadores/JugadoresEquipos/"+idEquipo;
        let url = Global.urlApi+request;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                jugadores: response.data
            })
          })

     }

     componentDidMount = () => {
        this.loadJugadores();
     }
     componentDidUpdate = (oldProps) => {
        if(oldProps.idequipo != this.props.idequipo){
          this.loadJugadores();
        }
    }

  render() {
    return (
      <table>
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Posicion</th>
                <th>Pais</th>
                <th>Fecha nacimiento</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.jugadores &&
                this.state.jugadores.map((jugador, index) => {
                    return(
                        <tr key={index}>
                            <td><img src={jugador.imagen} style={{width:"100px",height:"100px"}}/></td>
                            <td>{jugador.nombre}</td>
                            <td>{jugador.posicion}</td>
                            <td>{jugador.pais}</td>
                            <td>{jugador.fechaNacimiento}</td>
                        </tr>
                    );
                })

            }
        </tbody>
      </table>
    )
  }
}