import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
    document.title = 'Admin DashBoard';
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [getData, setGetData] = useState({
        data: [],
        users: []
    })
    useEffect(async () => {
        axios.get(`http://localhost:8000/tempdata`)
            .then(res => {
                console.log(res.data)
                setGetData({ data: res.data })
            })
    }, [])
    useEffect(async () => {
        axios.get('http://localhost:8000/user')
            .then(res => {
                if (res) {
                    setUsers(res.data)
                    setLoading(true)
                }

                console.log(res.data)

            })
    }, [])

    console.log(getData)
    if (status === 'Pending') {

    }
    if (status === 'Users') {

    }
    const handleChange = (x) => {
        setLoading(true)
        fetch(`http://localhost:8000/updatestore`, {
            method: 'PUT',
            body: JSON.stringify(x),
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('The Post is approved')
                    window.location.reload()
                    setLoading(false)
                }

            })
        alert('The Post is approved')
        window.location.reload()
        setLoading(false)
    }


    return (

        <div>
            <div className='container my-4 d-flex '>
                <div>
                    <NavLink to='/' className={`text-decoration-none text-dark`}><h2>FindJob</h2></NavLink>
                </div>
                <h3 className='mx-auto mt-'>Welcome to Admin Panel</h3>
            </div>
            <div className='d-flex flex-wrap container ' >
                <div className='col-2' style={{ borderRight: '2px solid lightgrey' }}>
                    <h5 onClick={() => setStatus('Pending')} style={{ cursor: 'pointer' }}>Pending Approval</h5> <br />
                    <h5 onClick={() => setStatus('Users')} style={{ cursor: 'pointer' }}>Users</h5>
                </div>
                <div className="col-8">
                    {
                        status == '' ? <h1>Hello Admin</h1> :
                            <div>
                                {
                                    status === 'Pending' ?
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Serial No</th>
                                                    <th scope="col">Job Title</th>
                                                    <th scope="col">Job Poster Email</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            {loading ? <tbody>
                                                {getData.data.map((x, id) =>
                                                    <tr>
                                                        <th scope="row">{id + 1}</th>
                                                        <td>{x.title}</td>
                                                        <td>{x.email}</td>
                                                        <td>
                                                            {
                                                                x.pending ? <span className="text-success font-weight-bold">Approved</span> :
                                                                    <select name="" id="status" onChange={() => handleChange(x)}>
                                                                        <option value="Pending" >Pending</option>
                                                                        <option value="Approve">Approve</option>
                                                                    </select>
                                                            }
                                                        </td>
                                                    </tr>)}

                                            </tbody> : <h5>Loading...</h5>}
                                        </table> :
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Serial No</th>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Email</th>
                                                    {/* <th scope="col">Status</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(x =>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>{x.name}</td>
                                                        <td>{x.email}</td>

                                                    </tr>)}

                                            </tbody>
                                        </table>

                                }
                            </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default AdminPanel;