import React from 'react';
import { useHistory } from 'react-router-dom';
import frame from '../../../images/Frame.png'

const Header = () => {
    const history = useHistory()
    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center container text-white' style={{ minHeight: '500px' }}>
            <div className="col-6">
                <h1 className='font-weight-bold'>Are you a job seeker <br/> or  Job Poster</h1>
                
                <button className='btn btn-warning px-5 mb-5 mt-3' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '20px' }} onClick={() => history.push('/register')}>Getstarted</button>
            </div>
            <div className="col-6">
                <img src={frame} style={{width:'100%'}} alt="" />
            </div>

        </div>
    );
};

export default Header;