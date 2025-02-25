import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import './Detalle.css';
import TablaHorarios from './TablaHorarios'
function Detalle() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fbe0be168c5b7c94765896d073c2497f";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "videos",
            language: "es-MX",
          },
        });
        setPelicula(data);

        const trailer = data.videos.results.find(
          (vid) => vid.name === "Trailer oficial" || vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
        setError(null);
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
        setPelicula(null);
        setTrailer(null);
        setError("Error al cargar los detalles de la película");
      }
    };

    fetchPelicula();
  }, [id]);

  return (
    <div className="detalle-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : pelicula ? (
        <>
          <div className="titulo">
            <h3>{pelicula.title}</h3>
            <p className="sinopsis-text text-sm">Sinopsis: {pelicula.overview}</p> 
          </div>
          <div className="detalle-content">
            <div className="detalle-image">
              <img src={`${IMAGE_PATH}${pelicula.poster_path}`} alt={pelicula.title} />
            </div>
            <div className="detalle-trailer">
              {trailer && (
                <YouTube
                  videoId={trailer.key}
                  opts={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>
            
          </div>
          <div className="detalle-info">
            <p className="release-date">Fecha de lanzamiento: {pelicula.release_date}</p>
            <p className="runtime">Duración: {pelicula.runtime} minutos</p>
            <p className="rating">Calificación: {pelicula.vote_average}</p>

          </div>
        </>
      ) : (
        <p className="loading-message">Cargando detalles de la película...</p>
        
      )}
    </div>
  );
}

export default Detalle;