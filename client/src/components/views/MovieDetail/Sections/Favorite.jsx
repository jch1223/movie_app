import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

function Favorite({ movieInfo, userFrom, movieId }) {
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
      if (res.data.success) {
        // console.log("get favorite num", res.data);
        setFavoriteNumber(res.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다");
      }
    });
  }, [variables]);

  useEffect(() => {
    Axios.post("/api/favorite/favorited", variables).then((res) => {
      if (res.data.success) {
        // console.log("get favorited", res.data);
        setFavorited(res.data.favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다");
      }
    });
  }, [variables]);

  const favoriteHandler = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFavorite", variables).then((res) => {
        if (res.data.success) {
          // console.log("removeFavorite", res.data);
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 취소에 실패했습니다");
        }
      });
    } else {
      Axios.post("/api/favorite/addFavorite", variables).then((res) => {
        if (res.data.success) {
          // console.log("addFavorite", res.data);
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 설정에 실패했습니다");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={favoriteHandler}>
        Favorite{" "}
        {Favorited ? (
          <HeartTwoTone twoToneColor="#eb2f96" />
        ) : (
          <HeartOutlined />
        )}{" "}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
