import React, { useEffect, useState } from "react";
import { BASE_URL, IMAGE_BASE_URL, API_KEY } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../common/GridCards";
import { Row, Button } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    const endpotion = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${Page}`;

    fetch(endpotion)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies([...Movies, ...data.results]);
        if (Page === 1) {
          setMainMovieImage(data.results[0]);
        }
      });
  }, [Page, Movies]);

  const loadMoreHandler = () => {
    setPage(Page + 1);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {/* MAIN IMAGE */}
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}/w1280/${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.title}
            desc={MainMovieImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2>Movies by latest</h2>
          <hr />

          {/* Movie Grid Cards */}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, i) => {
                return (
                  <div key={i}>
                    <GridCards
                      image={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}/w500/${movie.poster_path}`
                          : null
                      }
                      movieId={movie.id}
                      movieName={movie.title}
                    />
                  </div>
                );
              })}
          </Row>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={loadMoreHandler}>Load More</Button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
