import React from 'react';
import HorarioCine from './HorarioCine';
import './TablaHora.css';


const TablaHorarios = () => {
  
  const horariosCine = [
    {
      lugar: 'Jardin Plaza',
      horarios: [
        { dia: 'Lunes', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Martes', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Miércoles', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Jueves', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Viernes', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Sábado', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
        { dia: 'Domingo', horario: ['10:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'] },
      ]
    },
  ];

 

  return (
    <div className="tabla-horarios-container">
      {horariosCine.map((cine, index) => (
        <div key={index} className="tabla-horarios">
          <h2>Horarios </h2>
          <HorarioCine lugar={cine.lugar} horarios={cine.horarios} />
          
        </div>
      ))}
    </div>
  );
};

export default TablaHorarios;