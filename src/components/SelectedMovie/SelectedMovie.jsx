import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const path = "https://api.themoviedb.org/3/";
const movie = "movie/";
const movieAuth = "?api_key=";
const apiKey = "f9e6afddb568c3eac19893218b578cea";

const SelectedMovie = () => {
  const [singleMovie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const getMovie = (id) => {
    fetch(`${path}${movie}${id}${movieAuth}${apiKey}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setMovie(data);
          console.log(data.homepage);
          console.log("param ", id);
        },
        (err) => console.log(err)
      );
  };
  return (
    <Fragment>
      {singleMovie && (
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{singleMovie.title}</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-5">
                  <img
                    alt="movieimage"
                    className="thumbnail"
                    src={`http://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`}
                  />
                </div>
                <div className="col-md-7">
                  <ul className="list-group">
                    <li className="list-group-item">
                      Genres:
                      {singleMovie?.genres.map((genre, index) => (
                        <span key={index}>{genre.name} </span>
                      ))}
                    </li>
                    <li className="list-group-item">
                      Release Date: {singleMovie.release_date}
                    </li>
                  </ul>
                  <br />

                  {singleMovie.homepage && (
                    <a
                      href={singleMovie.homepage}
                      className="btn btn-default"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Movie Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SelectedMovie;
