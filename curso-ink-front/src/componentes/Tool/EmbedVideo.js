import ReactPlayer from 'react-player/youtube';
// or
// import ReactPlayer from 'react-player';
//if you want to support other video URLs

const EmbedVideo = (props) => {
    return (
        <ReactPlayer controls={true} url={props.url} />
    );
}

export default EmbedVideo;