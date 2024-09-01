import PropTypes from 'prop-types';


const Playlist = ({ tracks, onSelect, isLoading }) => {
    return (
        <div className="playlist">
            <h2>Playlist</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : tracks.Length === 0 ? (
                <p>No tracks available.</p>
            ) : (
            <ul>
                {tracks.map((track, index) => (
                    <li key={index} onClick={() => onSelect(index)}>
                    <span className="track-name">{track.name}</span>
                    <span className="track-artist">{track.artist}</span>
                    <span className="track-duration">{track.duration}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
    );
};
Playlist.propTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default Playlist;
