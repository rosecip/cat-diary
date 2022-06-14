import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link className="button top-bar-button" to="/user-sessions/new">sign in</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button top-bar-button sign-up-button">
        sign up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const heart = (
    <p className="heart-icon">&hearts;</p>
  )

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link className="home-button" to="/cats">cat diary &hearts;</Link>
            </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
