import React from "react";
import PropTypes from "prop-types"
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message"
import Poster from "../../Components/Poster"

const Container = styled.div`
        padding : 20px;

`

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
    <>
        <Helmet>
            <title>TV | Nomflix</title>
        </Helmet>
        {loading ? <Loader></Loader> :
            <Container>
                {topRated && topRated.length &&
                    <Section title="Top Rated">
                        {topRated.map((show) => <Poster id={show.id} imageUrl={show.poster_path} title={show.name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0, 4)} isMovie={false}></Poster>)}
                    </Section>}
                {popular && popular.length &&
                    <Section title="Popular">
                        {popular.map((show) => <Poster id={show.id} imageUrl={show.poster_path} title={show.name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0, 4)} isMovie={false}></Poster>)}
                    </Section>}
                {airingToday && airingToday.length &&
                    <Section title="Airing Today">
                        {airingToday.map((show) => <Poster id={show.id} imageUrl={show.poster_path} title={show.name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0, 4)} isMovie={false}></Poster>)}
                    </Section>}
                {error && <Message color="#e74c3c" text={error}></Message>}


            </Container>}
    </>


TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default TVPresenter;