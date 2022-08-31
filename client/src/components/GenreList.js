import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);

  const fetchGenres = async () => {
    try {
      const result = await axios(`http://localhost:4000/genres`);
      await setGenres(result.data.genres);
      setloaded(true);
    } catch (err) {
      seterrorMessage(err.response.data);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);
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
        <div className="row">
          {genres.map((genre, index) => (
            <div className="col-sm-2 mb-2" key={genre.id}>
              <div className="card" >
                <div className="card-body text-center">
                  <Link to={`/genres/${genre.id}/movies`}>{genre.genre_name}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GenreList;
