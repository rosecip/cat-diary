import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import { Redirect } from "react-router-dom";

const CatForm = (props) => {
  const catBreeds = ["", "Maine Coon", "American Shorthair", "not sure..just a weird little guy"];

  const [newCat, setNewCat] = useState({
    name: "",
    breed: "",
  });

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const catBreedOptions = catBreeds.map((breed) => {
    return (
      <option key={breed} value={breed}>
        {breed}
      </option>
    );
  });

  const onChangeHandler = (event) => {
    setNewCat({
      ...newCat,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    setNewCat({
      name: "",
      breed: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postCat(newCat);
    clearForm();
  };

  const postCat = async (newCat) => {
    try {
      const response = await fetch("/api/v1/cats", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newCat),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${respoonse.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  return (
    <div>
      <h1>add a cat =^.^=</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={onChangeHandler} />
        </label>
        <label>
          Breed:
          <select type="text" name="breed" onChange={onChangeHandler}>
            {catBreedOptions}
          </select>
        </label>
        <div>
          <input type="submit" value="Add Cat!!!" />
        </div>
      </form>
    </div>
  );
};

export default CatForm;
