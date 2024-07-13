import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { singleMovie } from "../../api";
import css from "./MovieDetailsPage.module.css";
const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [posterPath, setPosterPath] = useState(``);
  const location = useLocation();
  console.log('location :>> ', location);
  const backLocation = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  useEffect(() => {
    const getOneMovie = async () => {
      const cleanMovieId = movieId.replace(":", "");
      const data = await singleMovie(cleanMovieId);
      setMovie(() => data.data);
    };

    getOneMovie();
  }, [movieId, setMovie]);

  const { title, vote_average, overview, genres, poster_path } = movie;

  useEffect(() => {
    setPosterPath(`https://image.tmdb.org/t/p/w780/${poster_path}`);
  }, [setPosterPath, poster_path]);

  return (
    <>
      <div>
        <ul className={css.list}>
          <li className={css.listItem}>
            <div className={css.containerDetails}>
              <img
                src={poster_path ? posterPath : defaultImg}
                alt={title}
                className={css.poster}
              />
            </div>
          </li>
          <li className={css.listItem}>
            <div className={css.containerDetails}>
              <h2>{title} </h2>
              <p>user score: {vote_average}</p>
            </div>
            <div className={css.containerDetails}>
              <h3>overview</h3>
              <p className={css.overview}>{overview}</p>
            </div>
            <div className={css.containerDetails}>
              <h4>genres</h4>
              <div className={css.containerGenres}>
                {genres &&
                  genres.map((el) => (
                    <p className={css.genre} key={el.id}>
                      <span>{el.name}</span>
                    </p>
                  ))}
              </div>
            </div>
          </li>
        </ul>
        <Link to={backLocation.current} className={css.link}>
          back
        </Link>

        <nav className={css.containerNav}>
          <Link to={"cast"} className={css.link}>
            cast
          </Link>
          <Link to={"reviews"} className={css.link}>
            reviews
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
