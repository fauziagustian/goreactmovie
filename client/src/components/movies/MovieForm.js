import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function MovieForm() {
    const { id } = useParams();
    const {register, handleSubmit, setValue} = useForm();
    const isAddMode = !id;
    const fields = [
      'id',
      'title',
      'description',
      'runtime',
      'release_date',
      'rating',
      'mpaa_rating',
      'genres',
    ]

    const fetchMovies = async(id) =>{
      try {
        const result = await axios.get(`http://localhost:4000/movies/${id}`);
        result.data.movie.id = result.data.movie.id.toString();
        result.data.movie.runtime = result.data.movie.runtime.toString();
        result.data.movie.release_date = new Date(result.data.movie.release_date).toISOString().split('T')[0];
        console.log(result.data.movie.release_date)
        fields.forEach((field) => setValue(field, result.data.movie[field]))
      }catch(err) {
        console.log(err.response.data);
      }
    }

    useEffect(() => {
      if (!isAddMode) {
        fetchMovies(id);
      }
    }, [isAddMode])

    const onSubmit = async (data) => {
      if(isAddMode) {
        const result = await axios.post(
          `http://localhost:4000/admin/movie/add`,
          JSON.stringify(data)
        );
        console.log(result.data);
      }else {
        const result = await axios.post(
          `http://localhost:4000/admin/movie/update`,
          JSON.stringify(data)
        );
        console.log(result.data);
      }
      
    }
  return (
    <>
      <h2>Movie Form</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-3">Title</label>
        <input type="text" className="form-control" id="title" name="title" {...register("title", { required: true })}/>
        <label className="mb-3">Release Date</label>
        <input
          type="date"
          className="form-control"
          id="release_date"
          name="release_date"
          {...register("release_date", { required: true })}
        />
        <label className="mb-3">Runtime</label>
        <input
          type="number"
          className="form-control"
          id="runtime"
          name="runtime"
          {...register("runtime", { required: true })}
        />
        <div className="mb-3">
          <label className="form-label">
            MPAA Rating
          </label>
          <select name="mpaa_rating" id="mpaa_rating" className="form-control" {...register("mpaa_rating", { required: true })}>
            <option value="G" className="form-select">
              G
            </option>
            <option value="PG" className="form-select">
              PG
            </option>
            <option value="PG13" className="form-select">
              PG13
            </option>
            <option value="R" className="form-select">
              R
            </option>
            <option value="NC17" className="form-select">
              NC17
            </option>
          </select>
        </div>
        <label className="mb-3">Rating</label>
        <input
          type="number"
          className="form-control"
          id="rating"
          name="rating"
          {...register("rating", { required: true })}
        />
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>
          <textarea
            row={3}
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          />
        </div>
        <hr/>
        <button className="btn btn-primary mb-4" type="submit">Submit</button>
      </form>
    </>
  );
}

export default MovieForm;
