import React from "react";
import LibraryMusic from "./LibraryMusic";

export default function Library({
  music,
  setCurrentmusic,
  setIsplaying,
  setMusic,
  librarystatus,
}) {
  return (
    <div className={`library-container ${librarystatus ? "show-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-music-container">
        {music.map((track) => (
          <LibraryMusic
            key={music.id}
            setCurrentmusic={setCurrentmusic}
            track={track}
            music={music}
            setMusic={setMusic}
            setIsplaying={setIsplaying}
          />
        ))}
      </div>
    </div>
  );
}
