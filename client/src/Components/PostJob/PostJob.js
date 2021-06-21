import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik'
import axios from 'axios';
import { UserContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

const PostJob = () => {
    const history = useHistory()

    const getToken = localStorage.getItem('loggedIn')
    const [userData, setUserData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/user?token=' + getToken)
            .then(res => setUserData(res.data))
    }, [])
    let name
    let email
    userData.map(user => {
        name = user.name
        email = user.email
    })
    console.log(name)
    console.log(email)



    const formik = useFormik({
        initialValues: {
            title: '',
            company: '',
            requirements: '',
            experience: '',
            salary: '',

        },
        onSubmit: (values, { resetForm }) => {
            const tokenId = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            // setStatus({ mode: 'Login' })
            console.log(values)
            // if (status.mode == 'Register') {

            axios.post('http://localhost:8000/tempstore', { ...values, name: name, email: email })
                .then(response => {
                    if (response) {
                        alert('Your posted job is under review')
                        resetForm()
                    }
                })

            // }

        },
        validate: (values) => {
            let errors = {};
            // if (status === 'Register') {
            if (!values.title) {
                errors.title = 'Required'
            }
            if (!values.company) {
                errors.company = 'Required'
            }
            if (!values.requirements) {
                errors.requirements = 'Required'
            }
            // }



            return errors

        }
    })

    return (
        <>
            <div className="container" style={{ padding: '10px 0' }}>
                <div className='d-flex flex-wrap justify-content-center my-5 w-50' style={{ border: '1px solid lightGrey', margin: 'auto', borderRadius: '15px', padding: '30px 0', backgroundColor: 'white' }}>

                    <form className='d-flex flex-wrap justify-content-center' onSubmit={formik.handleSubmit}>
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='title' id='title' placeholder="Job Title" value={formik.values.title} />
                            {formik.touched.title && formik.errors.title ? (<div className="text-danger text-left">{formik.errors.title}</div>) : null}
                        </div>
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='company' id='company' placeholder="Company Name" value={formik.values.company} />
                            {formik.touched.company && formik.errors.company ? (<div className="text-danger text-left">{formik.errors.company}</div>) : null}
                        </div>
                        <div className="form-group col-md-10 mb-4">
                            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='requirements' id='requirements' placeholder="Requirements" value={formik.values.requirements} />
                            {formik.touched.requirements && formik.errors.requirements ? (<div className="text-danger text-left">{formik.errors.requirements}</div>) : null}
                        </div>
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='experience' id='experience' placeholder="Experience" value={formik.values.experience} />
                        </div>
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='salary' id='salary' placeholder="Salary" value={formik.values.salary} />
                        </div>

                        <button type="submit" className="btn text-white col-md-10 ml-2" style={{ backgroundColor: '#28044b' }} >Post a Job</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostJob;