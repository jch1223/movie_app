import React from "react";
import { Col } from "antd";

function GridCards({ image, movieId, movieName, characterName }) {
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: "relative", height: "320px" }}>
        {movieId ? (
          <a href={`/movie/${movieId}`}>
            <img style={{ width: "100%" }} src={image} alt={movieName} />
          </a>
        ) : (
          <img
            style={{ width: "100%", height: "320px" }}
            src={image}
            alt={characterName}
          />
        )}
      </div>
    </Col>
  );
}

export default GridCards;
