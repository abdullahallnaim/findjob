import React from 'react';
import Header from './Header/Header'
import './Home.css'
import Footer from './Footer/Footer';

const HomePage = () => {

    return (
        <>
            <div className='home-bg'>
                <Header />

            </div>
            <Footer />
        </>
    );
};

export default HomePage;