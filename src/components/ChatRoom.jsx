import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Message from './Message';
import { Configuration, OpenAIApi } from 'openai';
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    /* border: 2px solid red; */
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    border: 2px solid red;
    background-color: #474851;
    border-radius: 0.8rem;
    border: 0.1rem solid gray;
`;

const Chats = styled.div`
    /* border: 2px solid green;   */
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const InputBox = styled.div`
    /* border: 2px solid orange; */
    box-shadow: 0px -10px 14px -9px rgba(0,0,0,0.72);
    position: relative;
    padding: 1rem;
`;

const TextArea = styled.textarea`
    width: 100%;
    font-size: 1.7rem;
    padding: 1rem;
    scrollbar-width: none;
    resize: none;
    max-height: 20rem;
    &::-webkit-scrollbar {
        display: none;
    }
    &:focus {
        outline: none;
    }
`;

const SendButton = styled.button`
    position: absolute;
    top: 15%;
    right: 2%;
    background-color: transparent;
    border: 0;
    font-size: 2.5rem;
    cursor: pointer;

    span {
        color: rgb(26, 183, 34);
        display: block;
        transform: rotate(315deg);
    }
`;

const MsgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;


const ChatRoom = () => {

    const { currentUser } = useContext(AuthContext);
    const [input, setInput] = useState("");
    const obj = {
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const collRef = collection(db, `maindatabase/${currentUser.uid}/userdatabase`);
    const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        const chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;

    }, [])


    //! Realtime Read
    useEffect(() => {
        const unsub = onSnapshot(collRef, snapshot => {
            setUserChats(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.time > b.time) ? 1 : -1))
        });

        return () => {
            unsub();
        }
        // eslint-disable-next-line
    }, [])


    const resolveQuery = async () => {
        if (input) {
            obj.prompt = input;
            const time = Date.now();

            const docRef = doc(db, `maindatabase/${currentUser.uid}/userdatabase/${time}`)

            await setDoc(docRef, {
                userInput: input,
                time: time
            });

            const chatContainer = document.getElementById("chatContainer");
            chatContainer.scrollTop = chatContainer.scrollHeight;

            setInput("");

            const response = await openai.createCompletion(obj);
            const answer = response.data.choices[0].text;

            await updateDoc(docRef, {
                noviaOutput: answer.trim()
            });

            chatContainer.scrollTop = chatContainer.scrollHeight;

        }

    }

    return (
        <>
            <Wrapper>
                <Chats id='chatContainer' >
                    {
                        userChats.map((ele, i) => {
                            return (
                                <MsgWrapper key={i} >
                                    <Message content={ele.userInput} user={true} />
                                    {ele.noviaOutput && <Message content={ele.noviaOutput} user={false} />}
                                </MsgWrapper>
                            )
                        })
                    }
                </Chats>

                <InputBox>
                    <TextArea id="myTextarea" name="query" rows="1" value={input} onChange={e => setInput(e.target.value)} ></TextArea>
                    <SendButton onClick={resolveQuery} ><span>➤</span></SendButton>
                </InputBox>
            </Wrapper>
        </>
    )
}

export default ChatRoom