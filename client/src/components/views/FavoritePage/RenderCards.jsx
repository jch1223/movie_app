import React from "react";
import { Button, Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

const RenderCards = ({ data, onClickDelete }) => {
  const content = (
    <div>
      {data.moviePost ? (
        <img src={`${IMAGE_BASE_URL}/w500${data.moviePost}`} alt="movie post" />
      ) : (
        "no image"
      )}
    </div>
  );

  return (
    <tr>
      <Popover content={content} title={`${data.movieTitle}`}>
        <td>{data.movieTitle}</td>
      </Popover>
      <td>{data.movieRunTime}분</td>
      <td>
        <Button onClick={() => onClickDelete(data.movieId, data.userFrom)}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default RenderCards;
