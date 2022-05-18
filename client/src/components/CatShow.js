import React, { useState, useEffect } from "react";
import DiaryEntryTile from "./DiaryEntryTile.js";

const CatShow = (props) => {
  debugger;

  const [cat, setCat] = useState({
    name: "",
    breed: "",
    diaryEntries: [],
  });

  const fetchCat = async () => {
    try {
      const response = await fetch(`/api/v1/cats/${props.match.params.id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setCat(body.serializedCat);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const diaryEntryTiles = cat.diaryEntries.map((diaryEntry) => {
    return (
      <DiaryEntryTile
        key={diaryEntry.id}
        metCat={diaryEntry.metCat}
        ownCat={diaryEntry.ownCat}
        date={diaryEntry.date}
        entry={diaryEntry.entry}
      />
    );
  });

  return (
    <div>
      <h1>{cat.name}</h1>
      <h3>{cat.breed}</h3>
      {diaryEntryTiles}
    </div>
  );
};

export default CatShow;
