import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory, Link } from 'react-router-dom';
// import { UserContext } from '../../App';

const Navigation = ({ color, bgColor }) => {
    const history = useHistory()
    // const [textColor, settextColor] = useState('white')
    var textColor = 'white'

    if (color == 'black') {
        textColor = 'dark'
    }
    const [userData, setUserData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/user?token=' + localStorage.getItem('loggedIn'))
            .then(res => setUserData(res.data))
    }, [])
    let name
    let email
    let isJobSeeker
    userData.map(user => {
        name = user.name
        email = user.email
        isJobSeeker = user.accountType
    })
    console.log(name)
    console.log(email)
    const handleLog = () => {
        localStorage.clear()
        setTimeout(function () { window.location.reload() }, 200);
    }
    // console.log(getUser)
    console.log(userData)
    // user.map(x => console.log(x.values.name))
    return (
        <header className="container" >
            <Navbar className="d-flex flex-wrap justify-content-around" expand="lg">
                <div className='mr-5 mb-4'>
                    <Link to='/' className={`text-decoration-none text-${textColor}`}><h2>FindJob</h2></Link>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className=''>
                    <Nav className="mx-auto">
                        <NavLink className={`text-decoration-none font-weight-bold text-${textColor} mx-3 my-4`} to="/" style={{ fontSize: '17px', fontWeight: 'bold' }}>Home</NavLink>

                        <NavLink className={`text-decoration-none font-weight-bold text-${textColor} mx-3 my-4`} to='/' style={{ fontSize: '17px', fontWeight: 'bold' }}>About</NavLink>
                        <NavLink className={`text-decoration-none font-weight-bold text-${textColor} mx-3 my-4`} to="/" style={{ fontSize: '17px', fontWeight: 'bold' }}>Contact us</NavLink>
                        {isJobSeeker === 'Job Poster' ?
                            <Link className={`text-decoration-none font-weight-bold text-${textColor} mx-3 my-4`} to="/postjob" style={{ fontSize: '17px', fontWeight: 'bold' }}>Post Job</Link> : null}

                        {localStorage.getItem('loggedIn') ?
                            <>
                                <button className='btn btn-warning px-5 mb-5 mt-3 mx-3' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '30px' }} onClick={() => history.push('/profile')}>Profile</button>
                                <button className='btn btn-warning px-5 mb-5 mt-3' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '30px' }} onClick={handleLog}>Logout</button>
                            </>
                            : <>
                                <NavLink className={`text-decoration-none font-weight-bold text-${textColor} mx-3 my-4`} to="/register" style={{ fontSize: '17px', fontWeight: 'bold' }}>Register</NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Navigation;