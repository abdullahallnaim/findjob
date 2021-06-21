import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';


const Profile = () => {
    const [userData, setUserData] = useState([])
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        axios.get('http://localhost:8000/user?token=' + localStorage.getItem('loggedIn'))
            .then(res => {
                if(res){
                    setLoading(false)
                    setUserData(res.data)
                }
                })
    }, [])
    let name
    let email
    let isJobSeeker
    userData.map(user => {
        name = user.name
        email = user.email
        isJobSeeker = user.accountType
    })
console.log(name, email, isJobSeeker)
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/tempdata?email=` + email)
            .then(res => {
                console.log(res.data)
                setGetData(res.data)
            })
    }, [])
    const [appliedJob, setAppliedJob] = useState([])
    useEffect( () => {
        axios.get(`http://localhost:8000/getjobdata?email=` + email)
            .then(res => {
                console.log(res.data)
                setAppliedJob(res.data)
            })
    }, [])
    return (
        <>
            {!loading ?  <div>
                {
                    isJobSeeker == 'Job Seeker' ?
                        <div className="d-flex flex-wrap justify-content-center">
                            <div className="col-2" style={{ borderRight: '1px solid lightgray' }}>
                                <h4>Total Job Applied</h4>
                            </div>
                            <div className="col-8">
                            {
                                    appliedJob.map(x =>
                                        <div className='col-3 m-3 p-3' style={{ border: '1px solid lightgrey', borderRadius: '20px' }}>
                                            <h3 className='text-center'>{x.title}</h3>
                                            <p>Posted by : {x.name}</p>
                                            <h5>Requirements : </h5>
                                            <div className='w-100'>
                                                {x.requirements}
                                            </div>
                                            <div className='d-flex justify-content-center mt-5'>
                                                {
                                                    x.pending === 'false' ? <button className='btn btn-success' style={{ fontWeight: 'bold', borderRadius: '20px' }}>Approved</button> : <button className='btn btn-warning' style={{ fontWeight: 'bold', borderRadius: '20px' }}>Pending</button>
                                                }

                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                        </div> :
                        <div className='d-flex flex-wrap justify-content-center'>
                            <div className='col-2' style={{ borderRight: '1px solid lightgray' }}>
                                <h4>Profile</h4>
                                <h4>Total Job Posted : {getData.length}</h4>
                            </div>
                            <div className="col-8 d-flex flex-wrap justify-content-center">
                                {
                                    getData.map(x =>
                                        <div className='col-3 m-3 p-3' style={{ border: '1px solid lightgrey', borderRadius: '20px' }}>
                                            <h3 className='text-center'>{x.title}</h3>
                                            <p>Posted by : {x.name}</p>
                                            <h5>Requirements : </h5>
                                            <div className='w-100'>
                                                {x.requirements}
                                            </div>
                                            <div className='d-flex justify-content-center mt-5'>
                                                {
                                                    x.pending === 'false' ? <button className='btn btn-success' style={{ fontWeight: 'bold', borderRadius: '20px' }}>Approved</button> : <button className='btn btn-warning' style={{ fontWeight: 'bold', borderRadius: '20px' }}>Pending</button>
                                                }

                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                }
            </div> : <h3>Loading ...</h3> }
        </>
    );
};

export default Profile;