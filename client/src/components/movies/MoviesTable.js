import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null)
  const id = 0;

  const confirmDelete = async (id) => {
    
    const payload = {
      id: id
    }
    const result = await axios.post(
      `http://localhost:4000/admin/movie/delete`,
      JSON.stringify(payload),
      
    )
    
  }

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
        <>
          <div className="row">
            <div className="col-12">
              <Link to={`/admin/movies/create`} className="btn btn-sm btn-primary">Add</Link>
            </div>
          </div>
          <div className="row">
          <table className="table">
            <thead>
              <tr>
                <td>No</td>
                <td>Name</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Link to={`/movies/${movie.id}`}>{movie.title}</Link></td>
                  <td>
                    <div className="btn-group">
                      <button className='btn btn-secondary btn-sm dropdown-toggle'
														type='button'
														data-bs-toggle='dropdown'
														aria-expanded='false'>Action</button>
                      <ul className="dropdown-menu">
                      <li>
                        <span className="dropdown-item"><Link to={`/admin/movies/${movie.id}/update`}>Edit</Link></span>
                      </li>
                      <li>
                        <span className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => confirmDelete(movie.id)}>Delete</span>
                      </li>
                    </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          
          </table>
        </div>
        </>
      )}
    </>
  );
};

export default MoviesTable;
