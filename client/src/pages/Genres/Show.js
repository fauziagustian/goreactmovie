import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ShowMoviesGenre = () => {
    var { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loaded, setloaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const result = await axios(`http://localhost:4000/genres/${id}/movies`);
          await setMovies(result.data.movies);
          setloaded(true);
        } catch (err) {
          seterrorMessage(err.response.data);
        }
      };
  
      fetchMovies();
    }, [id]);
  return (
    <>
      {!loaded ? (
        (() => {
          if (errorMessage) {
            return (
              <div className="row">
                <p> Oops... {errorMessage}</p>
              </div>
            );
          } else {
            return (
              <div className="row">
                <p> Loading... </p>
              </div>
            );
          }
        })()
      ) : (
        <ul>
          { Array.isArray(movies) ? (
             movies.map( (movie) => (
              <li key={movie.id}> 
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))
          ):(
            <p> Oops... There's no movies data</p>
          )}  
        </ul>
      )}
    </>
  )
}

export default ShowMoviesGenre