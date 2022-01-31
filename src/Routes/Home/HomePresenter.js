import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';

const Container = styled.div`
    position : absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index : -99;
`;

const VideoBackground = styled.div`
    box-sizing: border-box;
    background: #000;
    width : 100vw;
    height : 100vh;
    position : absolute;
    // position: fixed;
    top: -15px; right: 0; bottom: 0; left: 0;
    z-index: -1;
    display : flex;
    justify-content : center;
`

const VideoForeground = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow : hidden;
`
const Iframe = styled.iframe`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0px;
    right : 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
`

const ListContainer = styled.div`
    padding : 20px;
    margin-top : 90vh;
    background-color : #000;
`

const MuteButton = styled.button`
    // padding-left : 0.8rem;
    // padding-right : 0.8rem;
    width : 100%;
    height : 100%;
    padding : 0.5rem;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : transparent;
    border : 1px solid rgba(255,255,255,0.7);
    color : white;
    border-radius : 50%;
    cursor : pointer;

`

const MuteButtonContainer = styled.div`
    position : absolute;
    right : 150px;
    bottom : 15%;
    display : flex;
    z-index : 100;
    cursor : pointer;
`

const MuteButtonSpan = styled.span`
    width : 2.4vw;
    height : 2.4vw;
    position : relative;
    display : flex;
`

const MuteButtonSvg = styled.svg`
    height : 100%;
    width : 100%;
`


const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error, nowPlayingVideos, mute, onClick }) =>
    <>
        <Helmet>
            <title>Movies | Nomflix</title>
        </Helmet>
        {loading ? <Loader></Loader> :
            <Container>
                {nowPlayingVideos && nowPlayingVideos.length > 0 &&
                    <VideoBackground>
                        <VideoForeground>
                            <Iframe width='1000' src={`https://www.youtube.com/embed/${nowPlayingVideos[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${nowPlayingVideos}`} frameborder="0" allowfullscreen></Iframe>
                            <MuteButtonContainer>
                                <MuteButtonSpan>
                                    <MuteButton onClick={onClick}>
                                        <div style={{ width: '2.4vw', height: '2.4vw' }}>
                                            <MuteButtonSvg viewBox="0 0 24 24">
                                                <path d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm6-10.414l3.293-3.293 1.414 1.414L18.414 12l3.293 3.293-1.414 1.414L17 13.414l-3.293 3.293-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L17 10.586z" fill="currentColor"></path>
                                            </MuteButtonSvg>
                                        </div>
                                    </MuteButton>
                                </MuteButtonSpan>
                            </MuteButtonContainer>
                        </VideoForeground>

                        {/* <iframe id="ytplayer" type="text/html" width="640" height="360"
                            src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&mute=1&origin=http://example.com"
                            frameborder="0"></iframe> */}
                    </VideoBackground>
                }

                <ListContainer>

                    {nowPlaying && nowPlaying.length > 0 &&
                        <Section title="Now Playing">
                            {nowPlaying.map((movie) => <Poster id={movie.id} imageUrl={movie.poster_path} title={movie.title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0, 4)} isMovie={true}></Poster>)}
                        </Section>}
                    {upcoming && upcoming.length > 0 &&
                        <Section title="UpComing">
                            {upcoming.map((movie) => <Poster id={movie.id} imageUrl={movie.poster_path} title={movie.title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0, 4)} isMovie={true}></Poster>)}
                        </Section>}
                    {popular && popular.length > 0 &&
                        <Section title="Popular">
                            {popular.map((movie) => <Poster id={movie.id} imageUrl={movie.poster_path} title={movie.title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0, 4)} isMovie={true}></Poster>)}
                        </Section>}
                    {error && <Message color='#e74c3c' text={error} ></Message>}
                </ListContainer>
            </Container>}
    </>
HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    mute: PropTypes.string
}



export default HomePresenter;