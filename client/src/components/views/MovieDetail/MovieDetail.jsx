import React, { useState, useEffect } from "react";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Row, Button } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCards from "../common/GridCards";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";

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
        console.log("get movie detail", data);
        setMovie(data);
      });

    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("get movie credits", data);
        setCasts(data.cast);
      });
  }, [movieId]);

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
      <div style={{ width: "60%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {Movie && (
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userFrom={localStorage.getItem("userId")}
            />
          )}
        </div>

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
          <Button onClick={toggleHandler}>Toggle Actor View</Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, i) => {
                if (cast.profile_path) {
                  return (
                    <GridCards
                      key={i}
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}/w500/${cast.profile_path}`
                          : null
                      }
                      characterName={cast.character}
                    />
                  );
                }
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
