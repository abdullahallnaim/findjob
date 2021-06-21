import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik'
import axios from 'axios';
import { UserContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import StripeCheckOut from '../StripeCheckOut/StripeCheckOut';

const Login = () => {
    const history = useHistory()
    const [status, setStatus] = useState({
        mode: 'Register'
    })
    const [type, setType] = useState({
        mode: 'Job Seeker'
    })
    const [showOption, setShowOption] = useState(false)
    const [userData, setUserData] = useState([])
    const [selected, setSelected] = useState()

    // console.log(tokenId);
    const handleClick = () => {
        if (type.mode === 'Job Seeker') {
            setType({ mode: 'Job Poster' })
            setShowOption(true)
        }
        if (type.mode === 'Job Poster') {
            setType({ mode: 'Job Seeker' })
            setShowOption(false)
        }
        if (status.mode == 'Login') {
            setShowOption(false)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPass: '',

        },
        onSubmit: (values, { resetForm }) => {
            const tokenId = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            setStatus({ mode: 'Login' })
            // console.log(values)
            if (status.mode == 'Register') {

                axios.post('http://localhost:8000/users', { ...values, token: tokenId, selectedOption: selected, accountType: type.mode })
                    .then(response => {
                        console.log(response)
                    })

            }
            if (status.mode == 'Login') {

                let accountTypes
                let tokens
                userData.map((value => {
                    console.log(value)
                    accountTypes = value.accountType
                    tokens = value.token
                }))
                console.log(tokens)
                localStorage.setItem('loggedIn', tokens)
                if (localStorage.getItem('loggedIn')) {
                    history.push('/profile')
                    window.location.reload()
                }

            }
            console.log(userData)

        },
        validate: (values) => {
            let errors = {};
            if (status === 'Register') {
                if (!values.name) {
                    errors.name = 'Required'
                }
            }
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid Email Address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be at least 4 characters'
            }

            if (status.mode == 'Register') {
                if (!values.confirmPass) {
                    errors.confirmPass = 'Required'
                } else if (values.password !== values.confirmPass) {
                    errors.confirmPass = 'Password does not match'
                }
            }
            return errors

        }
    })

    axios.get(`http://localhost:8000/user?email=${formik.values.email}`)
        .then(response => {
            setUserData(response.data)
        })

    const handleOption = (e) => {
        const selectedOption = e.target.value
        setSelected(selectedOption)
    }
    return (
        <>
            <div className="container" style={{ padding: '10px 0' }}>
                <div className='d-flex flex-wrap justify-content-center my-5 w-50' style={{ border: '1px solid lightGrey', margin: 'auto', borderRadius: '15px', padding: '30px 0', backgroundColor: 'white' }}>

                    {status.mode === 'Register' ?
                        <>
                            <button className="btn btn-danger col-md-10 ml-2 my-3" onClick={handleClick} >Swtich to {type.mode == 'Job Seeker' ? 'Job Poster' : 'Job Seeker'} form</button>
                            <h1 className='font-weight-bold mb-5 text-center col-12'>{type.mode}</h1>
                        </>
                        : <h1>Login</h1>}



                    <form className='d-flex flex-wrap justify-content-center' onSubmit={formik.handleSubmit}>
                        {status.mode == 'Register' ? <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='name' id='name' placeholder="Full Name" value={formik.values.name} />
                            {formik.touched.name && formik.errors.name ? (<div className="text-danger text-left">{formik.errors.name}</div>) : null}
                        </div> : null}
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control" name='email' id='email' placeholder="Enter Your Email Address" />
                            {formik.touched.email && formik.errors.email ? (<div className="text-danger text-left">{formik.errors.email}</div>) : null}
                        </div>
                        {status.mode === 'Register' ?
                            <>
                                {showOption ?
                                    <>
                                        <div className="form-group col-md-10 mb-4">
                                            <select className="form-select" onChange={handleOption} aria-label="Default select example">
                                                <option defaultValue>------Select Any Package-------</option>
                                                <option value="30" name='silk' > Premium - 30 Hours Job Post Per Month </option>
                                                <option value="20">Standard - 20 Hours Job Post Per Month</option>
                                                <option value="10" >Basic - 10 Hours Job Post Per Month</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-10 mb-4">
                                            <StripeCheckOut />
                                        </div>

                                    </>
                                    : null}
                            </>
                            : null}
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className="form-control" name='password' id='password' placeholder="Password" />
                            {formik.touched.password && formik.errors.password ? (<div className="text-danger text-left">{formik.errors.password}</div>) : null}
                        </div>
                        {status.mode == 'Register' ? <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPass} type="password" className="form-control" name='confirmPass' id='confirm-password' placeholder="Confirm Password" />
                            {formik.touched.confirmPass && formik.errors.confirmPass ? (<div className="text-danger text-left">{formik.errors.confirmPass}</div>) : null}
                        </div> : null}
                        <button type="submit" className="btn text-white col-md-10 ml-2" style={{ backgroundColor: '#28044b' }} >{status.mode == 'Register' ? 'Register' : 'Login'}</button>

                        {status.mode == 'Register' ? <p>Already Have an account? <span style={{ color: 'crimson', cursor: 'pointer' }} onClick={() => setStatus({ mode: 'Login' })}>click here to login</span></p> : <p>Don't Have an account? <span style={{ color: 'crimson', cursor: 'pointer' }} onClick={() => setStatus({ mode: 'Register' })}>create an account</span></p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;