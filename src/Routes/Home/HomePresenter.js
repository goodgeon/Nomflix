import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';

const Container = styled.div`
    padding : 20px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error }) =>
    <>
        <Helmet>
            <title>Movies | Nomflix</title>
        </Helmet>
        {loading ? <Loader></Loader> :
            <Container>

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
            </Container>}
    </>
HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}



export default HomePresenter;