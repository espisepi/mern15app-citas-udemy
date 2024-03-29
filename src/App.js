import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en local storage
  const citasIniciales = JSON.parse(localStorage.getItem('citas')) || [];

  // Array de citas
  // const [ citas, guardarCitas ] = useState([]); Cuando no se usaba localStorage
  const [ citas, guardarCitas ] = useState(citasIniciales);

  // UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    const citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] ); // Cada vez que cambie el state de citas se ejecuta la funcion useEffect

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    // citas.push(cita) -> tambien funciona pero en React hay que usar las funciones que modifican el state para seguir las buenas practicas
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    // guardarCitas(nuevasCitas);  Tambien funciona
    guardarCitas([
      ...nuevasCitas
    ])
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      {/* skeleton css Framework syntaxis from className */}
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
