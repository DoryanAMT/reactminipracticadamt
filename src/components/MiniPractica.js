import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
import Jugadores from './jugadores';

export default class MiniPractica extends Component {

    equipoSeleccioando = React.createRef();

    state = {
        equipos: [],
        equipoSeleccionado: 0
    }


    buscarJugadores = (e) =>{
        e.preventDefault();
        let idEquipo = this.equipoSeleccioando.current.value;
        
        this.setState({
            equipoSeleccionado : idEquipo
        })
        
    }

    loadEquipos = () => {
        let request = "/api/Equipos";
        let url = Global.urlApi + request;
        // console.log(url)
        axios.get(url).then(response => {
            // console.log("Leyendo servicio");
            // console.log(response.data)
            this.setState({
                equipos: response.data
            })
          })
    }



    componentDidMount = () => {
        this.loadEquipos();
    }

  render() {
    return (
      <div>
        <h1>MiniPractica</h1>
        <form>
            <label>Nombre Jugadores: </label>
            <input type='text'></input>
            <button>Buscar por nombre</button>
            <hr/>
            <label>Seleccione un equipo: </label>
            <select ref={this.equipoSeleccioando}>
                {
                    this.state.equipos &&
                    this.state.equipos.map((equipo, index) => {
                        return(
                            <option key={index} value={equipo.idEquipo} >{equipo.nombre}</option>
                        );
                    })
                }
            </select>
            <button onClick={this.buscarJugadores}>Buscar jugadores</button>
            
        </form>
        {
            this.state.equipoSeleccionado != 0 &&
            <Jugadores idequipo={this.state.equipoSeleccionado}/>
        }
      </div>
    )
  }
}
