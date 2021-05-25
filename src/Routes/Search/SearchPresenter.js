import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from 'react-helmet';
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message"
import Poster from "../../Components/Poster"

const Container = styled.div`
    padding:20px;
`

const Form = styled.form`
    margin-bottom : 50px;
    width : 100%;
`

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`

const SearchPresenter = ({
    movieResults,
    tvResults,
    loading,
    error,
    searchTerm,
    handleSubmit,
    updateTerm
}) => (
    <Container>
        <Helmet>
            <title>Search | Nomflix</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm}></Input>
        </Form>
        {loading ? <Loader></Loader> :
            <>

                {movieResults && movieResults.length > 0 && (
                    <Section title="Movie Results">
                        {movieResults.map((movie) => <Poster id={movie.id} imageUrl={movie.poster_path} title={movie.title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0, 4)} isMovie={true}></Poster>)}
                    </Section>)
                }

                {tvResults && tvResults.length > 0 &&
                    <Section title="TV Show Results">
                        {tvResults.map((show) => <Poster id={show.id} imageUrl={show.poster_path} title={show.name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0, 4)} isMovie={false}></Poster>)}
                    </Section>}
                {error && <Message color="#e74c3c" text={error}></Message>}
                {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message color="#95a5a6" text="Nothing found"></Message>}
            </>
        }
    </Container>)

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    handldSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
}

export default SearchPresenter;