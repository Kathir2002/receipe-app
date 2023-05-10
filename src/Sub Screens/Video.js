import YoutubePlayer from 'react-native-youtube-iframe';

const Videos = ({ videoID }) => {

    return (
        <YoutubePlayer
            height={"100%"}
            play={true}
            videoId={videoID}
        />
    );
};
export default Videos