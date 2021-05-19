import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
export default function Nav({ librarystatus, setLibrarystatus }) {
  return (
    <nav>
      <h1>Lofi Music</h1>
      <button
        className="btn"
        onClick={() => {
          if (librarystatus) {
            setLibrarystatus(false);
          } else {
            setLibrarystatus(true);
          }
        }}
      >
        <FontAwesomeIcon className="icon" icon={faMusic} />
        Library
      </button>
    </nav>
  );
}
