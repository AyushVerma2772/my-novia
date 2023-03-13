import React from 'react';
import styled from 'styled-components';
import ChatRoom from '../components/ChatRoom';
import Navbar from '../components/Navbar';


const ChatWrapper = styled.div`
    height: calc(100vh - 6rem);
    min-height: calc(100vh - 6rem);
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    color: snow;
    font-size: 1.8rem;
    background-color: #272A2A;
`;

const Home = () => {


    return (
        <>
            <div>
                <Navbar />
                <ChatWrapper>
                    <ChatRoom />
                </ChatWrapper>
            </div>
        </>
    )
}

export default Home