import React from "react";

const CatShow = (props) => {
  return (
    <div>
      <h1>{props.cat.name}</h1>
      <p>{props.cat.breed}</p>
    </div>
  );
};

export default CatShow;
