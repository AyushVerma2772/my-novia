import React, { useContext } from 'react';
import '../styles/Navbar.css';
import profileImg from "../images/profile-img.png"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <nav className="d-flex navbar" style={{ borderBottom: '0.1rem solid #c3c3c3' }} >
                <a href="/" className='logo' >Novia</a>

                <div className="d-flex user-info">
                    <img className='profile-img' src={profileImg} alt="" />

                    <div className="d-flex info-box">
                        <h3 className='username'>{currentUser.displayName}</h3>
                        <button className="logout-btn" onClick={() => signOut(auth)} >logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar