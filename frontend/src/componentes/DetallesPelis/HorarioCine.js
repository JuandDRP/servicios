import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HorarioCine = ({ lugar, horarios }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const reservar = () => {
    navigate('/reservas');
  };

  return (
    <div className="horario-cine">
      <div className="horario-header" onClick={toggleExpanded}>
        <h3>{lugar}</h3>
        <span>{expanded ? '-' : '+'}</span>
      </div>
      {expanded && (
        <div className="horario-body">
          {horarios.map((horario, index) => (
            <div key={index}>
              <h4>{horario.dia}</h4>
              <button onClick={reservar} className="reservar-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Reservar</button>
              <ul>
                {horario.horario.map((hora, i) => (
                  <li key={i}>{hora}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default HorarioCine;