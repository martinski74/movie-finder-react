import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";

const Movie = ({ movie }) => {
  return (
    <Fragment>
      {movie.poster_path && (
        <img
          className={`${classes.image} thumbnail`}
          src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie"
        />
      )}
      <h4>{movie.title}</h4>
      <p>{movie.release_date}</p>
      <p>
        <Link to={`/movie/${movie.id}`} className="btn btn-default">
          View Details
        </Link>
      </p>
    </Fragment>
  );
};

export default Movie;
