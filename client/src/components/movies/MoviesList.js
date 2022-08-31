import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null)
  const id = 0;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios(`http://localhost:4000/movies`);
        await setMovies(result.data.movies);
        setloaded(true);
      }catch (err) {
        seterrorMessage(err.response.data)
      }
      
    };

    fetchMovies();
  }, [id]);

  return (
    <>
      {!loaded ? (
        (() => { 
          if(errorMessage){
            return (
              <div className="row">
                <p> Oops... {errorMessage}</p>
              </div>
            );
          }else {
            return (
              <div className="row">
                <p> Loading... </p>
              </div>
            );
          }
        })()
      ) : (
        <div className="row">
          {movies.map((movie, index) => (
            <div className="col-sm-4 mb-2" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.description}
                  </p>
                  <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MoviesList;
