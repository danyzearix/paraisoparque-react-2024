import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react'
import "./Obituarios.css"
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

const Obituarios = () => {

const [obituarios, setObituarios] = useState([]);
const [hasError, setHasError] = useState(false); // Nuevo estado para errores

useEffect(() => {
  axios.get('https://paraiso-api-hzcg.4.us-1.fl0.io/api/obituarios')
    .then(response => {
      setObituarios(response.data);
    })
    .catch(error => {
      console.error('Error al obtener los datos de la API:', error);
      setHasError(true); // Establecer el estado de error si hay un problema
    });
}, []);

DateTime.local().setLocale('es');
const bogotaTime = DateTime.local().setZone('America/Bogota');
const formattedDate = bogotaTime.toLocaleString(DateTime.DATE_FULL);

return (
  <Fragment>
    <div className="containerMainObi">
      <div>
        <h3 className='parrafoVerde'>Servicios del dia</h3>
        <h3 className='parrafoGris'>{formattedDate}</h3>
      </div>
    </div>

    <div className='ObiturariosTitle'>
      <h1 className='genericTtitle'>OBITUARIOS</h1>
      <img src="https://elparaisoparquecementerio.com.co/wp-content/uploads/2023/06/Memorial-Service.png" width={52} alt="" />
    </div>

    <div className='ObituariosContainer'>
      <div className='ObituariosSubcontainer'>
        <div className="container-hijo izquierdaObi">
          <img className='ObiImage' src="https://paraisocementerio.a2hosted.com/wp-content/uploads/2024/01/Obituarios.jpg" width={210} height={210} alt="" />
        </div>
        <div className="grid">
          {/* Aquí es donde decidimos qué mostrar según el estado */}
          {hasError || obituarios.length === 0 ? (
            <h3>No hay obituarios disponibles</h3>
          ) : (
            obituarios.slice(0, 4).map(obituario => (
              <div className="grid-item" key={obituario.id}>
                <h3 className='nombrePersona'>{obituario.nombre} (Q.E.P.D)</h3>
                <p>VELACIÓN: {obituario.velacion}</p>
                <p>EXEQUIAS: {obituario.exequias}</p>
                <i className="bi bi-watch"> <span className='hora'>HORA: {obituario.hora}</span></i> <br />
                <i className="bi bi-geo-alt-fill"> <span className='hora'>DESTINO FINAL: {obituario.destino_final}</span></i>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    <Link to="/ObituariosGenerales"> <div className="cards-container">
      <button className='greenButton'>Ver todos</button>
    </div>
    </Link>
    

  </Fragment>
)

}

export default Obituarios;
