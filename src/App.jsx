import { useState, useEffect } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist';
import './App.css';
import axios from 'axios';

const App = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    useEffect(() => {
      const fetchTracks = async () => {
        try {
          const response = await axios.get('YOUR_API_ENDPOINT_HERE');
          setTracks(response.data.tracks);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      };

      fetchTracks();
    }, []);

    const handleSelectTrack = (index) => {
        setCurrentTrackIndex(index);
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const handlePreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="app">
            {tracks.length > 0 && (
                <Player
                    currentTrack={tracks[currentTrackIndex].url}
                    onNext={handleNextTrack}
                    onPrevious={handlePreviousTrack}
                />
            )}
            <Playlist tracks={tracks} onSelect={handleSelectTrack} />
        </div>
    );
};

export default App;