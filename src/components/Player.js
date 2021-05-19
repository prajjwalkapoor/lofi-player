import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({
  currentMusic,
  isplaying,
  setIsplaying,
  music,
  setMusic,
  setCurrentmusic,
}) {
  useEffect(() => {
    const activeMusic = music.map((mus) => {
      if (mus.id === currentMusic.id) {
        return {
          ...mus,
          active: true,
        };
      } else {
        return {
          ...mus,
          active: false,
        };
      }
    });
    setMusic(activeMusic);
  }, [currentMusic]);

  const [musicinfo, setMusicinfo] = useState({
    currentTime: "",
    duration: "",
  });

  const audioRef = useRef(null);

  //  event handlers

  const audioPlayHandler = () => {
    if (!isplaying) {
      audioRef.current.play();
      setIsplaying(true);
    } else {
      audioRef.current.pause();
      setIsplaying(false);
    }
  };

  const timeUpdatehandler = async (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setMusicinfo({
      ...musicinfo,
      currentTime: current, //timeFormat(current),
      duration: duration, //timeFormat(duration),
    });
  };
  const draghandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setMusicinfo({ ...musicinfo, currentTime: e.target.value });
  };

  const timeFormat = (timestamp) => {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = Math.floor(timestamp % 60);

    var formatted =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return formatted;
  };
  if (musicinfo.currentTime === musicinfo.duration) {
    setIsplaying(false);
  }

  if (isplaying) {
    audioRef.current.play();
  }
  const trackSkippingHandler = (direction) => {
    const currentIndex = music.findIndex(
      (track) => track.id === currentMusic.id
    );

    if (direction === "skip-back") {
      setCurrentmusic(music[(currentIndex - 1) % music.length]);
      if ((currentIndex - 1) % music.length === -1) {
        setCurrentmusic(music[music.length - 1]);
        return;
      }
    }
    if (direction === "skip-forward") {
      setCurrentmusic(music[(currentIndex + 1) % music.length]);
    }
    console.log("next song" + currentIndex);
    console.log("length" + music.length);
    console.log((currentIndex - 1) % music.length);
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{timeFormat(musicinfo.currentTime || 0)}</p>
        <input
          type="range"
          min={0}
          max={musicinfo.duration || 0}
          value={musicinfo.currentTime}
          onChange={draghandler}
        />
        <p>{timeFormat(musicinfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <label htmlFor="volume">
          {" "}
          <FontAwesomeIcon
            className="skip-forward"
            icon={faVolumeUp}
            size="2x"
          />
        </label>
        <input
          className="volume"
          id="volume"
          min={0}
          max={1}
          step={0.01}
          type="range"
          onChange={(e) => (audioRef.current.volume = e.target.value)}
        />
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => trackSkippingHandler("skip-back")}
          icon={faAngleLeft}
          size="2x"
        />

        <FontAwesomeIcon
          className="play"
          icon={!isplaying ? faPlay : faPause}
          size="2x"
          onClick={audioPlayHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => trackSkippingHandler("skip-forward")}
        />
      </div>

      <audio
        onTimeUpdate={timeUpdatehandler}
        onLoadedMetadata={timeUpdatehandler}
        ref={audioRef}
        src={currentMusic.audio}
      ></audio>
    </div>
  );
}
