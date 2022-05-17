import React from "react";

const CatTile = (props) => {
  return (
    <div>
      <h1>{props.cat.name}</h1>
      <p>{props.cat.breed}</p>
    </div>
  );
};

export default CatTile;
