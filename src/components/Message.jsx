import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 45%;
    padding: 1rem;
    background-color: ${props => props.msgType ? '#e0e0e0': '#0a0a0a'};
    display: inline-block;
    align-self: ${props => props.msgType ? 'end': 'start'};
    color: ${props => props.msgType ? '#0a0a0a' : 'snow'};
    border-radius: 0.8rem;
    p {
        word-wrap: break-word;
        font-size: 1.5rem;
    }
`;


const Message = ({ content, user }) => {
    return (
        <>
            <Wrapper msgType={user} >
                <p>{content}</p>
            </Wrapper>
        </>
    )
}

export default Message