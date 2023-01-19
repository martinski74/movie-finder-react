import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";
import useFetch from "../../fetch-hook";
import * as Constants from "./../constants.js";

export const Movies = () => {
  const [searchedMovie, setsearchedMovie] = useState(null);
  const [isSearched, setIsSearchede] = useState(true);
  const [inputText, setInputText] = useState("");

  const [popularMovie] = useFetch(
    `${Constants.PATH}${Constants.POPULAR}${Constants.AUTENTICATION}${Constants.API_KEY}`
  );
  const [theartherMovie] = useFetch(
    `${Constants.PATH}${Constants.THEATHER}${Constants.AUTENTICATION}${Constants.API_KEY}`
  );
  const [kidsMovie] = useFetch(
    `${Constants.PATH}${Constants.KIDS}${Constants.AUTENTICATION}${Constants.API_KEY}`
  );
  const [dramaMovie] = useFetch(
    `${Constants.PATH}${Constants.DRAMA}${Constants.AUTENTICATION}${Constants.API_KEY}`
  );

  const findMovie = (e) => {
    e.preventDefault();
    if (inputText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputText}&api_key=${Constants.API_KEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            setsearchedMovie(data);
            setIsSearchede(true);
            setInputText("");
            console.log(data.results);
          },
          (err) => console.log(err)
        );
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to={"/"}>
          Movie Finder
        </Link>
      </nav>

      <div className="jumbotron">
        <div className="container">
          <h1>Find a movie</h1>
          <p>Search for a movie:</p>
          <form onSubmit={findMovie}>
            <input
              onChange={handleChange}
              value={inputText}
              type="text"
              className="form-control"
              name="search"
            />
            <button type="submit" className="btn btn-primary mt-2">
              Search
            </button>
          </form>
        </div>
      </div>

      {isSearched && (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Results</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              {searchedMovie?.results.map((movie, index) => (
                <div key={movie.id} className="col-md-2">
                  {index < 6 && <Movie key={movie.id} movie={movie} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Popular Movies</h3>
        </div>
        <div className="panel-body">
          {popularMovie && (
            <div className="row">
              {popularMovie?.results.map((movie, index) => (
                <div key={movie.id} className="col-md-2">
                  {index < 6 && <Movie key={movie.id} movie={movie} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">In Theaters</h3>
        </div>
        <div className="panel-body">
          {theartherMovie && (
            <div className="row">
              {theartherMovie.results.map((movie, index) => (
                <div key={movie.id} className="col-md-2">
                  {index < 6 && <Movie key={movie.id} movie={movie} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Kids</h3>
        </div>
        <div className="panel-body">
          {kidsMovie && (
            <div className="row">
              {kidsMovie.results.map((movie, index) => (
                <div key={movie.id} className="col-md-2">
                  {index < 6 && <Movie key={movie.id} movie={movie} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Drama</h3>
        </div>
        <div className="panel-body">
          {dramaMovie && (
            <div className="row">
              {dramaMovie.results.map((movie, index) => (
                <div key={movie.id} className="col-md-2">
                  {index < 6 && <Movie key={movie.id} movie={movie} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="footer-copyright text-center">
        <Link className="footer" to={"/"}>
          Popular Movies
        </Link>
      </div>
    </Fragment>
  );
};
