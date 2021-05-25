import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components';

const Container = styled.div`
    width : 100%;
    margin-top : 50px;

`

const Text = styled.div`
    color : ${(props) => props.color};
    width : 100%;
    font-size : 32px;
    text-align : center;

`

const Message = ({ text, color }) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>



)

export default Message;
