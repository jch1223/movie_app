import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import RenderCards from "./RenderCards";

function FavoritePage(props) {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((res) => {
      if (res.data.success) {
        console.log("getFavoredMovie", res.data);
        setFavorites(res.data.favorites);
      } else {
        alert("영화 정보를 가져오는데 실패 했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variavles = {
      movieId,
      userFrom,
    };

    console.log(movieId, userFrom);
    Axios.post("/api/favorite/removeFromFavorite", variavles).then((res) => {
      if (res.data.success) {
        fetchFavoredMovie();
      } else {
        alert("리스트에서 지우는데 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {Favorites.map((favorite, index) => {
            return (
              <RenderCards
                key={index}
                data={favorite}
                onClickDelete={onClickDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
