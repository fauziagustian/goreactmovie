import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoviesDetail from "../../components/movies/MoviesDetail";

const ShowMovie = () => {
  var { id } = useParams();
  const [movie, setMovies] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios(`http://localhost:4000/movies/${id}`);
        await setMovies(result.data.movie);
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
        <MoviesDetail movie={movie} />
      )}
    </>
  );
};

export default ShowMovie;
