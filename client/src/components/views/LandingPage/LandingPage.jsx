import React, { useEffect, useState } from "react";
import { BASE_URL, IMAGE_BASE_URL, API_KEY } from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endpotion = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=1`;

    fetch(endpotion)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies([data.results]);
        setMainMovieImage(data.results[0]);
      });
  }, []);

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
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button>Load More</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
