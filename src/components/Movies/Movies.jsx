import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";
const apiKey = "f9e6afddb568c3eac19893218b578cea";
const path = "https://api.themoviedb.org/3/";
const popular = "discover/movie?sort_by=popularity.desc";
const kids =
  "discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
const drama = "discover/movie?with_genres=18&primary_release_year=2014";
const theathers =
  "discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";
const authentication = "&api_key=";

export const Movies = () => {
  const [popularMovie, setPopular] = useState(null);
  const [theartherMovie, setTheather] = useState(null);
  const [kidsMovie, setKids] = useState(null);
  const [dramaMovie, setDrama] = useState(null);

  const [searchedMovie, setsearchedMovie] = useState(null);
  const [isSearched, setIsSearchede] = useState(true);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    getPopular();
    getTheather();
    getKids();
    getDrama();
  }, []);

  const getPopular = async () => {
    let res = await fetch(`${path}${popular}${authentication}${apiKey}`);
    let data = await res.json();
    setPopular(data);
    console.log(data.results);
  };

  const getTheather = () => {
    fetch(`${path}${theathers}${authentication}${apiKey}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setTheather(data);
          console.log(data.results);
        },
        (err) => console.log(err)
      );
  };

  const getKids = () => {
    fetch(`${path}${kids}${authentication}${apiKey}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setKids(data);
          console.log(data.results);
        },
        (err) => console.log(err)
      );
  };

  const getDrama = () => {
    fetch(`${path}${drama}${authentication}${apiKey}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setDrama(data);
          console.log(data.results);
        },
        (err) => console.log(err)
      );
  };

  const findMovie = (e) => {
    e.preventDefault();
    if (inputText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputText}&api_key=${apiKey}`
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
        <a className="footer" href="#">
          Popular Movies
        </a>
      </div>
    </Fragment>
  );
};
