import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovie(data);
      });
  }, []);

  return (
    <div>
      {/* header */}
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}/w1280/${Movie.backdrop_path}`}
          title={Movie.title}
          desc={Movie.overview}
        />
      )}

      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* movie info */}
        {Movie && (
          <MovieInfo
            title={Movie.title}
            release_date={Movie.release_date}
            revenue={Movie.revenue}
            runtime={Movie.runtime}
            vote_average={Movie.vote_average}
            vote_count={Movie.vote_count}
            status={Movie.status}
            popularity={Movie.popularity}
          />
        )}
        <br />

        {/* action grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
