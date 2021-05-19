import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./components/Styles/app.scss";
import LofiList from "./components/lofilist";
import Library from "./components/Library";
import Nav from "./components/Nav";
document.title = "Free Lofi Music Player";
function App() {
  const [music, setMusic] = useState(LofiList);
  const [currentmusic, setCurrentmusic] = useState(music[0]);
  const [isplaying, setIsplaying] = useState(false);
  const [librarystatus, setLibrarystatus] = useState(false);
  return (
    <div className="App">
      <Nav librarystatus={librarystatus} setLibrarystatus={setLibrarystatus} />
      <Song currentMusic={currentmusic} isplaying={isplaying} />
      <Player
        currentMusic={currentmusic}
        setCurrentmusic={setCurrentmusic}
        isplaying={isplaying}
        setIsplaying={setIsplaying}
        music={music}
        setMusic={setMusic}
      />
      <Library
        librarystatus={librarystatus}
        music={music}
        setMusic={setMusic}
        setCurrentmusic={setCurrentmusic}
        setIsplaying={setIsplaying}
      />
    </div>
  );
}

export default App;
