import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';


const Player = ({ currentTrack, onNext, onPrevious }) => {
    const handleError = (error) => {
        console.error('Error playing audio:', error);

    };
    const audioPlayerRef = useRef(null);
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') audioPlayerRef.current.togglePlay();
            if (e.code === 'ArrowLeft') onPrevious();
            if (e.code === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onPrevious, onNext]);
    
    return (
        <div className="player">
            <div className="track-info">
                <h2>Now Playing</h2>
                <h3>{currentTrack.name}</h3>
                <p>{currentTrack.artist}</p>
                {currentTrack.album && <p>{currentTrack.album}</p>}
            </div>
        <AudioPlayer
            src={currentTrack}
            onPlay={() => console.log('Playing')}
            onClickNext={onNext}
            onClickPrevious={onPrevious}
            showSkipControls
            showJumpControls={false}
            showFilledVolume={true}
            showFilledProgress={true}
            progressUpdateInterval={100}
            onError={handleError}
        />
        </div>
    );
};
Player.propTypes = {
    currentTrack: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

export default Player;
