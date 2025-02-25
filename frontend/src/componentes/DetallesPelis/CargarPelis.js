/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

import './CargarPelis.css';
import Detalle from './Detalle';

import { useNavigate } from 'react-router-dom';

function CargarPeliculas() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "fbe0be168c5b7c94765896d073c2497f";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedMovieIds, setSelectedMovieIds] = useState(new Set());
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async (searchKey = "") => {
    const type = searchKey ? "search/movie" : "movie/now_playing";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        language: "es-MX",
      },
    });
    setMovies(results);
    setSelectedMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Trailer oficial"   
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setSelectedMovie(data);
  };

  const selectMovie = async (movie) => {
    await fetchMovie(movie.id);
    setSelectedMovie(movie);
    setSelectedMovieIds((prevIds) => new Set(prevIds).add(movie.id));
    setPlaying(false);
    navigate(`/detalle/${movie.id}`);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5 text-4xl">Peliculas Populares</h2>
      <form className="container mb-4 text-black" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4 mb-3"
              onClick={() => selectMovie(movie)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
      <Detalle selectedMovieIds={Array.from(selectedMovieIds)} />
    </div>
  );
}

export default CargarPeliculas;