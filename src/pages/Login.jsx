import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PolygonLuminary from '../components/PolygonLuminary';
import { auth } from '../firebase-config';


const Wrapper = styled.div`
    position: relative;
    height: 100vh;
`;

const CardContainer = styled.div`
    position: relative;
    overflow: hidden;
`;

const SignUpCard = styled.div`
    width: 35rem;
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.85);
    
    /* border: 1px solid rgba(209, 213, 219, 0.3); */
    padding: 2rem;
    padding-bottom: 7rem;
    z-index: 60;
    box-shadow: 2px 5px 17px 1px rgba(255,255,255,0.31);
`;

const SignUpHeading = styled.h2`
    font-size: 2.8rem;
    color: #0a0a0a;
    margin-bottom: 2.5rem;
    cursor: pointer;
    display: inline-block;
    transition: transform 0.2s linear;
`;

const SingUpForm = styled.form`
    height: 80%;
    padding: 1rem;
    flex-direction: column;
    gap: 3.5rem;
    /* border: 2px solid red; */
`;

const Button = styled.button`
    background-color: rgb(26, 183, 34);
    color: snow;
    font-size: 1.7rem;
    padding: 0.7rem 1.5rem;
    border: 0;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const LoginCard = styled(SignUpCard)`
    background-color: #5c5c5c;
    position: absolute;
    /* bottom: 0; */
    left: 0;
    z-index: 65;
    transition: all 0.4s linear;
`;

const Error = styled.p`
    color: crimson;
    font-size: 1.5rem;
    margin-top: 0.7rem;
    text-align: center;
`;

const Name = styled.a`
    font-size: 3rem;
    text-decoration: none;
    font-weight: bold;
    color: snow;
    position: absolute;
    top: 2rem;
    left: 2rem;
`;





const Login = () => {

    const [activeCard, setActiveCard] = useState("signup");
    const [regErr, setRegErr] = useState(null);
    const [loginErr, setLoginErr] = useState(null);
    const navigate = useNavigate();


    const handleRegistration = async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            await updateProfile(user, {
                displayName: name
            })

            navigate("/");

        } catch (error) {
            setRegErr(error.message)
        }

    }


    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");

        } catch (error) {
            setLoginErr(error.message)
        }

    }




    return (
        <>
            <Wrapper className='d-flex' >
                <PolygonLuminary />
                <Name href='/'>Novia</Name>

                <CardContainer>
                    <SignUpCard>
                        <SignUpHeading style={{ transform: `${activeCard === 'signup' ? 'scale(1)' : 'scale(0.8)'}` }} onClick={e => setActiveCard("signup")} >Register</SignUpHeading>

                        <SingUpForm className='d-flex' onSubmit={e => handleRegistration(e)} >
                            <div className="input-box">
                                <input type="text" id='name' required={true} />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-box">
                                <input type="text" id='s-email' required={true} />
                                <label htmlFor="s-email">Email</label>
                            </div>
                            <div className="input-box">
                                <input type="password" id='s-password' required={true} />
                                <label htmlFor="s-password">Password</label>
                            </div>

                            <Button>Sign Up</Button>


                        </SingUpForm>

                        {regErr && <Error>{regErr}</Error>}
                    </SignUpCard>

                    {/* =============== LoginCard =============== */}

                    <LoginCard style={{ bottom: `${activeCard === 'login' ? '-1rem' : '-28rem'}` }} >
                        <SignUpHeading onClick={e => setActiveCard("login")} style={{ textAlign: 'right', color: 'snow', transform: `${activeCard === 'login' ? 'scale(1)' : 'scale(0.8)'}` }} >Login</SignUpHeading>

                        <SingUpForm className='d-flex' onSubmit={e => {handleLogin(e)}} >

                            <div className="input-box">
                                <input style={{ borderBottom: '0.2rem solid snow', color: 'snow' }} type="text" id='l-email' required={true} />
                                <label style={{ color: 'snow' }} htmlFor="l-email">Email</label>
                            </div>
                            <div className="input-box">
                                <input style={{ borderBottom: '0.2rem solid snow', color: 'snow' }} type="password" id='l-password' required={true} />
                                <label style={{ color: 'snow' }} htmlFor="l-password">Password</label>
                            </div>

                            <Button>Login</Button>

                        </SingUpForm>

                        {loginErr && <Error>{loginErr}</Error>}
                    </LoginCard>
                </CardContainer>
            </Wrapper>
        </>
    )
}

export default Login