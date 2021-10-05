import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../components/Mycontext";
import { AiFillPlayCircle } from "react-icons/ai";
import Stars from "../../components/Stars";
import Age from "../../components/Age";
import FavHeart from "../../components/FavHeart";
import CastComponent from "../../components/CastComponent";

export default class MoviePage extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);

    this.state = {
      adult: "",
      cast: [""],
      vote_count: "nada",
      genre_ids: ["nada"],
    };
  }

  componentDidMount() {
    let idNumber = parseInt(this.props.match.params.id); //gets id of the movie and formats it;
    let thisMovie = Object.values(this.context.fetched).find(
      (movie) => movie.id === idNumber
    ); //finds the movie on the context using the id as query parameter
    this.setState(thisMovie);

    const getGenre = async () => {
      //fetches for all generes ids on the api and filters them to find the ones that match with this movie genres ids.
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_NEWKEY}&language=en-US`,
        {
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const arrayFromResponse = Object.values(response); //gets all ids
          const arrayWithGenres = arrayFromResponse[0]; //access to the ids array
          const filteredArray = arrayWithGenres.filter((genre) =>
            thisMovie.genre_ids.includes(genre.id)
          ); //filters to get the ones that matches with this movie
          const genresNamesArray = filteredArray.map((genre) => genre.name); //get those genre names.
          this.setState({ genres: genresNamesArray.join(", ") });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getGenre();

    const getCast = async () => {
      //gets the cast for this movie throught the api and sets the state to the first 10 cast members;

      await fetch(
        `https://api.themoviedb.org/3/movie/${idNumber}/credits?api_key=${process.env.REACT_APP_NEWKEY}&language=en-US)`
      )
        .then((r) => r.json())
        .then((resp) => this.setState({ cast: resp.cast.slice(0, 10) }));
    };

    getCast();
  }

  render() {
    return (
      <div className="body">
        <div className="imgcontainer">
          <img
            alt={`${this.state.title} poster`}
            className="imgcontainer__img"
            src={`https://image.tmdb.org/t/p/w500/${this.state.poster_path}`}
          ></img>
        </div>

        <div className="main">
          <div className="main__upper">
            <div className="main__upper__topflex">
              <Link to={"/"} className="main__upper__topflex__backbttn">
                Back
              </Link>
              <FavHeart></FavHeart>
            </div>
            <AiFillPlayCircle className="main__upper__playicon"></AiFillPlayCircle>
            <Age boolean={this.state.adult}></Age>
          </div>

          <div className="main__meta">
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="main__meta__title"
            >
              {this.state.title}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="main__meta__genres"
            >
              {this.state.genres}
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="main__meta__flex"
            >
              <Stars big={true} stars={this.state.vote_average}></Stars>
              <span className="main__meta__flex__reviews">
                {this.state.vote_count} Reviews
              </span>
            </div>
          </div>

          <section className="main__description">
            <h3 className="main__description__storyline">Storyline</h3>
            <p className="main__description__overview">{this.state.overview}</p>
          </section>

          <div className="castcontainer">
            <div className="castcontainer__uppperflex">
              <h3>Cast</h3>
              <p>see all</p>
            </div>
            <div className="castcontainer__cards">
              {this.state.cast.map((castmember) => (
                <CastComponent
                  key={castmember.id}
                  id={castmember.id}
                  actorname={castmember.name}
                  img={`https://image.tmdb.org/t/p/w500/${castmember.profile_path}`}
                ></CastComponent>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}