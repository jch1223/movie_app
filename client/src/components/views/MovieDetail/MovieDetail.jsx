import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../common/GridCards";
import { Row } from "antd";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState(null);
  const [Casts, setCasts] = useState(null);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovie(data);
      });

    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCasts(data.cast);
      });
  }, []);

  const toggleHandler = () => {
    setActorToggle(!ActorToggle);
  };

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
          <button onClick={toggleHandler}>Toggle Actor View</button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, i) => {
                return (
                  <div key={i}>
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}/w500/${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  </div>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
