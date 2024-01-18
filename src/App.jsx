import { useEffect, useRef } from 'react';
import './App.css'
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

function App() {

  const controllerRef = useRef(null);

  useEffect(() => {
    const {
      /** @type {shaka.Player} */ player,
      // /** @type {shaka.ui.Overlay} */ ui,
      /** @type {HTMLVideoElement} */ videoElement
    } = controllerRef.current;

    async function loadAsset() {
      // Load an asset.
      await player.load('/hls.m3u8');

      // Trigger play.
      // i want to console at every event of user play pause at which timestamp 
      // Trigger play and log timestamp on play and pause events
      videoElement.addEventListener("play", () => {
        console.log("Play event triggered at timestamp:", videoElement.currentTime);
      });

      videoElement.addEventListener("pause", () => {
        console.log("Pause event triggered at timestamp:", videoElement.currentTime);
      });

      // videoElement.play();
      // console.log(ui.playButton.click())
      videoElement.play();
    }

    loadAsset();
    //log when user leave the player at any mode like close tab or any
    window.addEventListener("beforeunload", () => {
      console.log("User left the player at timestamp:", videoElement.currentTime);
      // save this timestamp in localstorage
      localStorage.setItem("timestamp", videoElement.currentTime);
    });

  }, []);

  return (
    <div>
      <h1>Shaka player</h1>
      <ShakaPlayer ref={controllerRef} autoPlay width="400" height="400" /> 
    </div>
  )
}

export default App
